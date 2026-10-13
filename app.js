// PyQuest Main Application Controller
class PyQuestApp {
  constructor() {
    this.currentLevelId = null;
    this.currentProjectId = "calculator";
    
    // Clear any testing session flags
    try {
      sessionStorage.clear();
      localStorage.removeItem("pyquest_test_done");
      localStorage.removeItem("pyquest_test_session");
    } catch(e) {}

    // Clean normal state loaded from localStorage
    this.unlockedLevels = JSON.parse(localStorage.getItem("pyquest_unlocked")) || [0];
    this.completedLevels = JSON.parse(localStorage.getItem("pyquest_completed")) || [];
    this.earnedBadges = JSON.parse(localStorage.getItem("pyquest_badges")) || [];
    this.completedProjects = JSON.parse(localStorage.getItem("pyquest_projects")) || [];
    this.xp = parseInt(localStorage.getItem("pyquest_xp") || "0", 10);
    this.studentName = localStorage.getItem("pyquest_student_name") || "";
    this.certId = localStorage.getItem("pyquest_cert_id") || "";

    this.initDOM();
    this.bindEvents();
    this.renderHeaderStats();
    this.renderLevelMap();
    
    // Load Pyodide engine asynchronously in background
    pyRunner.loadPyodideEngine();
  }

  initDOM() {
    this.levelMapEl = document.getElementById("level-map");
    this.arenaEl = document.getElementById("arena-view");
    this.projectStudioEl = document.getElementById("project-studio");
    this.levelGridEl = document.getElementById("level-grid");
    
    this.codeTextarea = document.getElementById("code-textarea");
    this.consoleOutput = document.getElementById("console-output");
    this.testResultsEl = document.getElementById("test-results");
    this.runBtn = document.getElementById("run-code-btn");
    this.nextBtn = document.getElementById("next-level-btn");
    this.tryYourselfBtn = document.getElementById("try-yourself-btn");
    this.resetBtn = document.getElementById("reset-code-btn");
    
    // Mini-Project Elements
    this.projectCodeTextarea = document.getElementById("project-code-textarea");
    this.projectConsoleOutput = document.getElementById("project-console-output");
    this.projectVerifyResults = document.getElementById("project-verify-results");
    this.projTabGuide = document.getElementById("proj-tab-guide");
    this.projTabEditor = document.getElementById("proj-tab-editor");
    
    this.xpValEl = document.getElementById("user-xp");
    this.badgeCountEl = document.getElementById("badge-count");
    this.projectsNavBtn = document.getElementById("projects-nav-btn");
    this.projectsNavLabel = document.getElementById("projects-nav-label");
    
    this.badgesModal = document.getElementById("badges-modal");
    this.celebrationModal = document.getElementById("celebration-modal");
    this.certNameModal = document.getElementById("cert-name-modal");
    this.certificateModal = document.getElementById("certificate-modal");

    this.tabGuideBtn = document.getElementById("mobile-tab-guide");
    this.tabEditorBtn = document.getElementById("mobile-tab-editor");
  }

  isCourseCompleted() {
    return this.completedLevels.length >= LEVELS.length;
  }

  bindEvents() {
    // Sound toggle
    const soundBtn = document.getElementById("sound-btn");
    soundBtn.addEventListener("click", () => {
      const isMuted = audio.toggleMute();
      soundBtn.textContent = isMuted ? "Sound: OFF" : "Sound: ON";
    });

    // Badges Modal toggle
    document.getElementById("badges-btn").addEventListener("click", () => {
      audio.playClick();
      this.openBadgesModal();
    });

    // Mini-Projects Navigation button
    if (this.projectsNavBtn) {
      this.projectsNavBtn.addEventListener("click", () => {
        audio.playClick();
        if (this.isCourseCompleted()) {
          this.showProjectStudio();
        } else {
          alert(`Capstone Project Studio is locked.\n\nPlease complete all ${LEVELS.length} curriculum lessons first.\n\nCurrent Progress: ${this.completedLevels.length} / ${LEVELS.length} lessons completed.`);
        }
      });
    }

    // Certificate Button click
    document.getElementById("cert-btn").addEventListener("click", () => {
      audio.playClick();
      if (this.isCourseCompleted() || this.completedProjects.length > 0) {
        if (this.studentName) {
          this.openCertificateModal();
        } else {
          this.certNameModal.classList.add("active");
        }
      } else {
        alert(`Certificate in Progress.\n\nComplete all ${LEVELS.length} lessons and build your Capstone Project to unlock your verified Certificate of Completion.\n\nCurrent Progress: ${this.completedLevels.length} / ${LEVELS.length} lessons completed.`);
      }
    });

    document.querySelectorAll(".close-modal").forEach(btn => {
      btn.addEventListener("click", () => {
        audio.playClick();
        this.closeModals();
      });
    });

    // Reset Progress Button (resets to fresh state)
    document.getElementById("reset-progress-btn").addEventListener("click", () => {
      if (confirm("Reset all curriculum progress, badges, and projects to a fresh new state?")) {
        localStorage.clear();
        sessionStorage.clear();
        location.reload();
      }
    });

    // Back to map
    document.getElementById("back-to-map-btn").addEventListener("click", () => {
      audio.playClick();
      this.showLevelMap();
    });

    // Editor Actions
    this.runBtn.addEventListener("click", () => this.executeCode());
    
    this.resetBtn.addEventListener("click", () => {
      audio.playClick();
      if (this.currentLevelId !== null) {
        this.codeTextarea.value = "";
        this.consoleOutput.textContent = "Shell cleared.";
        this.testResultsEl.innerHTML = "";
      }
    });

    // Try Yourself On Your Own button action
    if (this.tryYourselfBtn) {
      this.tryYourselfBtn.addEventListener("click", () => {
        audio.playClick();
        this.codeTextarea.value = "";
        this.consoleOutput.className = "console-output";
        this.consoleOutput.textContent = "Try on your own sandbox active. Write your custom solution below.";
        this.testResultsEl.innerHTML = "";
        
        const level = LEVELS.find(l => l.id === this.currentLevelId);
        alert(`PRACTICE CHALLENGE:\n\n${level.tryYourselfChallenge || "Modify your code to test new variations."}`);
      });
    }

    this.nextBtn.addEventListener("click", () => {
      audio.playClick();
      const nextId = this.currentLevelId + 1;
      if (nextId < LEVELS.length && this.unlockedLevels.includes(nextId)) {
        this.loadLevel(nextId);
      } else {
        this.showLevelMap();
      }
    });

    // Keyboard shortcut (Ctrl+Enter / Cmd+Enter to run code)
    this.codeTextarea.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        this.executeCode();
      }
    });

    if (this.projectCodeTextarea) {
      this.projectCodeTextarea.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          this.runProjectCode();
        }
      });
    }
  }

  handleProjectBannerClick() {
    audio.playClick();
    if (this.isCourseCompleted()) {
      this.showProjectStudio();
    } else {
      alert(`Capstone Project Studio is locked.\n\nPlease complete all ${LEVELS.length} curriculum lessons first.\n\nCurrent Progress: ${this.completedLevels.length} / ${LEVELS.length} lessons completed.`);
    }
  }

  setMobileView(view) {
    if (view === 'guide') {
      this.arenaEl.classList.add("show-guide");
      this.arenaEl.classList.remove("show-editor");
      if (this.tabGuideBtn) this.tabGuideBtn.classList.add("active");
      if (this.tabEditorBtn) this.tabEditorBtn.classList.remove("active");
    } else {
      this.arenaEl.classList.add("show-editor");
      this.arenaEl.classList.remove("show-guide");
      if (this.tabEditorBtn) this.tabEditorBtn.classList.add("active");
      if (this.tabGuideBtn) this.tabGuideBtn.classList.remove("active");
    }
  }

  setProjectMobileView(view) {
    if (view === 'guide') {
      this.projectStudioEl.classList.add("show-guide");
      this.projectStudioEl.classList.remove("show-editor");
      if (this.projTabGuide) this.projTabGuide.classList.add("active");
      if (this.projTabEditor) this.projTabEditor.classList.remove("active");
    } else {
      this.projectStudioEl.classList.add("show-editor");
      this.projectStudioEl.classList.remove("show-guide");
      if (this.projTabEditor) this.projTabEditor.classList.add("active");
      if (this.projTabGuide) this.projTabGuide.classList.remove("active");
    }
  }

  renderHeaderStats() {
    this.xpValEl.textContent = this.xp;
    this.badgeCountEl.textContent = `${this.earnedBadges.length} / ${BADGES.length}`;

    if (this.projectsNavLabel) {
      if (this.isCourseCompleted()) {
        this.projectsNavLabel.textContent = "Projects [Unlocked]";
        this.projectsNavBtn.classList.remove("locked");
      } else {
        this.projectsNavLabel.textContent = "Projects [Locked]";
        this.projectsNavBtn.classList.add("locked");
      }
    }
  }

  renderLevelMap() {
    this.levelGridEl.innerHTML = "";

    // Update Project Status Banner
    const bannerCard = document.getElementById("project-banner-card");
    const bannerTag = document.getElementById("project-banner-tag");
    const bannerTitle = document.getElementById("project-banner-title");
    const bannerDesc = document.getElementById("project-banner-desc");
    const bannerBtn = document.getElementById("project-banner-btn");

    if (bannerCard && bannerTag && bannerTitle && bannerDesc && bannerBtn) {
      if (this.isCourseCompleted()) {
        bannerCard.classList.add("unlocked");
        bannerTag.textContent = "Capstone Studio [Unlocked]";
        bannerTitle.textContent = "Capstone Project Studio";
        bannerDesc.textContent = "Curriculum completed. Build your own software from scratch and integrate with an SQLite database.";
        bannerBtn.textContent = "Open Studio →";
        bannerBtn.className = "btn-primary";
      } else {
        bannerCard.classList.remove("unlocked");
        bannerTag.textContent = "Capstone Studio [Locked]";
        bannerTitle.textContent = "Capstone Mini-Project Studio (Locked)";
        bannerDesc.textContent = `Complete all ${LEVELS.length} curriculum lessons to unlock the Project Studio (${this.completedLevels.length}/${LEVELS.length} completed).`;
        bannerBtn.textContent = "Locked";
        bannerBtn.className = "btn-secondary";
      }
    }

    LEVELS.forEach(level => {
      const isUnlocked = this.unlockedLevels.includes(level.id);
      const isCompleted = this.completedLevels.includes(level.id);

      const card = document.createElement("div");
      card.className = `level-card ${isCompleted ? 'completed' : ''} ${!isUnlocked ? 'locked' : ''}`;

      card.innerHTML = `
        <div>
          <div class="level-card-header">
            <div class="level-icon-wrapper">L${level.id}</div>
            <span class="level-badge-status">${isCompleted ? 'Completed' : isUnlocked ? 'Available' : 'Locked'}</span>
          </div>
          <h3 class="level-card-title">${level.title}</h3>
          <p class="level-card-topic">${level.topic}</p>
        </div>
        <div class="level-card-footer">
          <span class="xp-tag">+${level.xp} XP</span>
          <span>${isUnlocked ? 'Start Lesson →' : 'Locked'}</span>
        </div>
      `;

      if (isUnlocked) {
        card.addEventListener("click", () => {
          audio.playClick();
          this.loadLevel(level.id);
        });
      }

      this.levelGridEl.appendChild(card);
    });
  }

  showLevelMap() {
    this.levelMapEl.style.display = "block";
    this.arenaEl.style.display = "none";
    this.projectStudioEl.style.display = "none";
    this.renderHeaderStats();
    this.renderLevelMap();
  }

  loadLevel(levelId) {
    this.currentLevelId = levelId;
    const level = LEVELS.find(l => l.id === levelId);

    this.levelMapEl.style.display = "none";
    this.projectStudioEl.style.display = "none";
    this.arenaEl.style.display = "flex";
    this.setMobileView('guide');

    document.getElementById("level-title").textContent = level.title;
    document.getElementById("level-story").innerHTML = level.story;
    document.getElementById("level-explanation").innerHTML = level.explanation;
    document.getElementById("level-task").innerHTML = level.task;

    const hintsList = document.getElementById("hints-list");
    hintsList.innerHTML = level.hints.map(h => `<li>${h}</li>`).join("");

    this.codeTextarea.value = "";
    this.codeTextarea.placeholder = level.placeholder || "Write your Python code solution here...";

    this.consoleOutput.className = "console-output";
    this.consoleOutput.textContent = "Write your code in the editor above and select 'Run Code'.";
    this.testResultsEl.innerHTML = "";
    
    if (this.nextBtn) this.nextBtn.style.display = "none";
    if (this.tryYourselfBtn) this.tryYourselfBtn.style.display = "none";
  }

  async executeCode() {
    audio.playClick();
    const code = this.codeTextarea.value;
    const level = LEVELS.find(l => l.id === this.currentLevelId);

    this.consoleOutput.textContent = "Executing Python code...";
    this.runBtn.disabled = true;
    this.runBtn.innerHTML = `<span>Running...</span>`;

    const result = await pyRunner.run(code);

    this.runBtn.disabled = false;
    this.runBtn.innerHTML = `<span>Run Code</span>`;

    if (!result.success && result.error) {
      audio.playError();
      this.consoleOutput.className = "console-output error";
      this.consoleOutput.textContent = `Python Error:\n${result.error}`;
      this.renderTestResults([], level.testCases);
      return;
    }

    this.consoleOutput.className = "console-output";
    this.consoleOutput.textContent = result.output || "(Code executed with no output)";

    let allPassed = true;
    const testResults = level.testCases.map(test => {
      const passed = test.check(result.output, code, result.vars);
      if (!passed) allPassed = false;
      return { description: test.description, passed };
    });

    this.renderTestResults(testResults, level.testCases);

    if (allPassed) {
      this.onLevelComplete(level);
    } else {
      audio.playError();
    }
  }

  renderTestResults(results, testCases) {
    this.testResultsEl.innerHTML = "";
    if (results.length === 0) return;

    results.forEach(res => {
      const item = document.createElement("div");
      item.className = `test-item ${res.passed ? 'pass' : 'fail'}`;
      item.innerHTML = `
        <span class="test-icon">${res.passed ? 'PASS' : 'FAIL'}</span>
        <span>${res.description}</span>
      `;
      this.testResultsEl.appendChild(item);
    });
  }

  onLevelComplete(level) {
    audio.playSuccess();

    const isFirstTime = !this.completedLevels.includes(level.id);

    if (isFirstTime) {
      this.completedLevels.push(level.id);
      this.xp += level.xp;
      
      const nextLevelId = level.id + 1;
      if (nextLevelId < LEVELS.length && !this.unlockedLevels.includes(nextLevelId)) {
        this.unlockedLevels.push(nextLevelId);
      }

      if (level.badgeId && !this.earnedBadges.includes(level.badgeId)) {
        this.earnedBadges.push(level.badgeId);
        setTimeout(() => this.showBadgeUnlockPopup(level.badgeId), 600);
      }

      localStorage.setItem("pyquest_completed", JSON.stringify(this.completedLevels));
      localStorage.setItem("pyquest_unlocked", JSON.stringify(this.unlockedLevels));
      localStorage.setItem("pyquest_badges", JSON.stringify(this.earnedBadges));
      localStorage.setItem("pyquest_xp", this.xp.toString());

      this.renderHeaderStats();

      // IF ALL LEVELS ARE COMPLETED, UNLOCK PROJECT STUDIO!
      if (this.completedLevels.length >= LEVELS.length) {
        setTimeout(() => {
          if (confirm("Congratulations! You have completed all 16 curriculum lessons.\n\nThe Capstone Project Studio is now unlocked.\n\nWould you like to open the Project Studio to build your capstone project and database now?")) {
            this.showProjectStudio();
          }
        }, 1200);
      }
    }

    if (this.tryYourselfBtn) this.tryYourselfBtn.style.display = "flex";
    if (this.nextBtn) this.nextBtn.style.display = "flex";
    
    this.triggerConfetti();
  }

  // --- MINI-PROJECT STUDIO LOGIC ---
  showProjectStudio() {
    if (!this.isCourseCompleted()) {
      alert(`Capstone Project Studio is locked.\n\nPlease complete all ${LEVELS.length} curriculum lessons first.\n\nCurrent Progress: ${this.completedLevels.length} / ${LEVELS.length} lessons completed.`);
      return;
    }

    this.levelMapEl.style.display = "none";
    this.arenaEl.style.display = "none";
    this.projectStudioEl.style.display = "flex";
    this.setProjectMobileView('guide');
    this.selectProject(this.currentProjectId || "calculator");
  }

  selectProject(projId) {
    this.currentProjectId = projId;
    const proj = PROJECTS.find(p => p.id === projId) || PROJECTS[0];

    // Update active tab buttons
    document.querySelectorAll(".project-chip-btn").forEach(btn => {
      if (btn.textContent.toLowerCase().includes(proj.id.replace("_", ""))) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    document.getElementById("proj-title").textContent = proj.title;
    document.getElementById("proj-desc").textContent = proj.description;

    // Render concepts tags
    const conceptsContainer = document.getElementById("proj-concepts-tags");
    conceptsContainer.innerHTML = proj.concepts.map(c => `<span class="concept-tag">${c}</span>`).join("");

    // Render step-by-step guidance & database tutorial
    const guidanceContainer = document.getElementById("proj-guidance-container");
    guidanceContainer.innerHTML = proj.guidance;

    // Set starter scaffold code (user writes the code himself)
    this.projectCodeTextarea.value = proj.starterCode;
    this.projectConsoleOutput.className = "console-output";
    this.projectConsoleOutput.textContent = "Write your solution in the editor and click 'Run Code'. Guidance and database integration instructions are on the left.";
    this.projectVerifyResults.style.display = "none";
  }

  resetProjectCode() {
    audio.playClick();
    const proj = PROJECTS.find(p => p.id === this.currentProjectId);
    if (proj) {
      this.projectCodeTextarea.value = proj.starterCode;
      this.projectConsoleOutput.textContent = "Starter code restored. Write your project logic and run.";
      this.projectVerifyResults.style.display = "none";
    }
  }

  async runProjectCode() {
    audio.playClick();
    const code = this.projectCodeTextarea.value;

    this.projectConsoleOutput.textContent = "Running project code...";
    const result = await pyRunner.run(code);

    if (!result.success && result.error) {
      audio.playError();
      this.projectConsoleOutput.className = "console-output error";
      this.projectConsoleOutput.textContent = `Execution Error:\n${result.error}`;
      return;
    }

    this.projectConsoleOutput.className = "console-output";
    this.projectConsoleOutput.textContent = result.output || "(Project executed successfully with no output)";
    audio.playSuccess();
  }

  async verifyProject() {
    audio.playClick();
    const proj = PROJECTS.find(p => p.id === this.currentProjectId);
    const code = this.projectCodeTextarea.value;

    const result = await pyRunner.run(code);
    const isPassing = proj.verify(result.output, code, result.vars);

    this.projectVerifyResults.style.display = "block";
    this.projectVerifyResults.innerHTML = `
      <div class="test-item ${isPassing ? 'pass' : 'fail'}">
        <span class="test-icon">${isPassing ? 'PASS' : 'FAIL'}</span>
        <span>${isPassing ? 'Project Verified: Required logic and operations implemented.' : 'Project Incomplete: Please write your functions and operations as guided.'}</span>
      </div>
    `;

    if (isPassing) {
      audio.playSuccess();
      if (!this.completedProjects.includes(proj.id)) {
        this.completedProjects.push(proj.id);
        this.xp += 300;
        localStorage.setItem("pyquest_projects", JSON.stringify(this.completedProjects));
        localStorage.setItem("pyquest_xp", this.xp.toString());
      }

      if (!this.earnedBadges.includes("project_creator")) {
        this.earnedBadges.push("project_creator");
        localStorage.setItem("pyquest_badges", JSON.stringify(this.earnedBadges));
        setTimeout(() => this.showBadgeUnlockPopup("project_creator"), 600);
      }

      this.renderHeaderStats();
      this.triggerConfetti();

      setTimeout(() => {
        if (!this.studentName) {
          this.certNameModal.classList.add("active");
        } else {
          this.openCertificateModal();
        }
      }, 1200);
    } else {
      audio.playError();
    }
  }

  generateCertificate() {
    const nameInput = document.getElementById("student-name-input").value.trim();
    if (!nameInput) return;

    this.studentName = nameInput;
    if (!this.certId) {
      this.certId = `PYQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    localStorage.setItem("pyquest_student_name", this.studentName);
    localStorage.setItem("pyquest_cert_id", this.certId);

    this.certNameModal.classList.remove("active");
    this.openCertificateModal();
  }

  openCertificateModal() {
    const todayStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    
    document.getElementById("cert-display-name").textContent = this.studentName || "PyQuest Graduate";
    document.getElementById("cert-date-val").textContent = todayStr;
    document.getElementById("cert-id-val").textContent = this.certId || `PYQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    this.certificateModal.classList.add("active");
    audio.playBadgeUnlock();
    this.triggerConfetti();
  }

  // 1-Click PNG Image Download Handler
  downloadCertificatePNG() {
    const certFrame = document.querySelector("#certificate-print-area .certificate-frame");
    if (!certFrame) return;

    if (!window.html2canvas) {
      window.print();
      return;
    }

    const fileName = `PyQuest_Certificate_${(this.studentName || "Graduate").replace(/\s+/g, "_")}.png`;

    html2canvas(certFrame, {
      backgroundColor: "#090d16",
      scale: 2.5,
      useCORS: true
    }).then(canvas => {
      const link = document.createElement("a");
      link.download = fileName;
      link.href = canvas.toDataURL("image/png");
      link.click();
    }).catch(err => {
      console.warn("Image download failed, opening browser print dialog:", err);
      window.print();
    });
  }

  showBadgeUnlockPopup(badgeId) {
    const badge = BADGES.find(b => b.id === badgeId);
    if (!badge) return;

    audio.playBadgeUnlock();

    document.getElementById("celebration-badge-icon").innerHTML = badge.icon;
    document.getElementById("celebration-badge-name").textContent = badge.name;
    document.getElementById("celebration-badge-desc").textContent = badge.description;

    this.celebrationModal.classList.add("active");
  }

  openBadgesModal() {
    const container = document.getElementById("badge-gallery");
    container.innerHTML = "";

    BADGES.forEach(badge => {
      const isEarned = this.earnedBadges.includes(badge.id);
      const card = document.createElement("div");
      card.className = `badge-item ${isEarned ? 'unlocked' : 'locked'}`;

      card.innerHTML = `
        <div class="badge-icon-box" style="background: ${isEarned ? '#1e293b' : 'rgba(255,255,255,0.03)'}; color: ${isEarned ? badge.color : '#64748b'};">
          ${badge.icon}
        </div>
        <h4 class="badge-name">${badge.name}</h4>
        <span class="badge-title-sub">${badge.title}</span>
      `;
      container.appendChild(card);
    });

    this.badgesModal.classList.add("active");
  }

  closeModals() {
    this.badgesModal.classList.remove("active");
    this.celebrationModal.classList.remove("active");
    this.certNameModal.classList.remove("active");
    this.certificateModal.classList.remove("active");
  }

  triggerConfetti() {
    const canvas = document.getElementById("confetti-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ["#38bdf8", "#0284c7", "#10b981", "#f59e0b", "#94a3b8"];
    const count = window.innerWidth <= 768 ? 30 : 60;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.8) * 10,
        size: Math.random() * 5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1
      });
    }

    let animId = null;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.25;
        p.alpha -= 0.02;

        if (p.alpha > 0) {
          alive = true;
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      if (alive) {
        animId = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (animId) cancelAnimationFrame(animId);
      }
    };

    animate();
  }
}

// Initialize on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  window.app = new PyQuestApp();
});
