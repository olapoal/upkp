/**
 * app.js
 * Master Application Controller - Simulasi KLC-CAT UPKP Kementerian Keuangan
 * Direktorat Jenderal Perbendaharaan (DJPb) Tahun 2026
 */

(function () {
  'use strict';

  // Global App State
  const AppState = {
    user: {
      nama: "",
      nip: "",
      email: "",
      unit: ""
    },
    currentExamId: null,
    examTimer: null,
    fontSizeLevel: 1.05,
    lastResultData: null,
    reviewFilter: 'all',
    subtestFilter: 'all'
  };

  // DOM Elements Cache
  const DOM = {
    // Screens
    screenLogin: document.getElementById('screenLogin'),
    screenProfile: document.getElementById('screenProfile'),
    screenDaftarUjian: document.getElementById('screenDaftarUjian'),
    screenRuangUjian: document.getElementById('screenRuangUjian'),
    screenHasil: document.getElementById('screenHasil'),

    // Top Header
    navUserInfo: document.getElementById('navUserInfo'),
    navUserFullname: document.getElementById('navUserFullname'),
    navUserNip: document.getElementById('navUserNip'),
    navAvatarCircle: document.getElementById('navAvatarCircle'),
    navExamTitleBox: document.getElementById('navExamTitleBox'),
    navExamTitle: document.getElementById('navExamTitle'),
    navSubtestTitle: document.getElementById('navSubtestTitle'),
    navTimerBox: document.getElementById('navTimerBox'),
    examTimerDisplay: document.getElementById('examTimerDisplay'),
    btnZoomIn: document.getElementById('btnZoomIn'),
    btnZoomOut: document.getElementById('btnZoomOut'),
    btnToggleFullscreen: document.getElementById('btnToggleFullscreen'),
    btnNavThemeToggle: document.getElementById('btnNavThemeToggle'),
    navThemeIcon: document.getElementById('navThemeIcon'),
    navThemeText: document.getElementById('navThemeText'),

    // Login Form
    quickLoginForm: document.getElementById('quickLoginForm'),
    loginInputNama: document.getElementById('loginInputNama'),
    loginInputNip: document.getElementById('loginInputNip'),
    loginInputEmail: document.getElementById('loginInputEmail'),
    loginInputUnit: document.getElementById('loginInputUnit'),
    btnShowKemenkeuModal: document.getElementById('btnShowKemenkeuModal'),
    btnGoogleLogin: document.getElementById('btnGoogleLogin'),
    btnCekPerangkat: document.getElementById('btnCekPerangkat'),

    // Profile Screen
    profileBigAvatar: document.getElementById('profileBigAvatar'),
    profileDisplayNama: document.getElementById('profileDisplayNama'),
    profUsername: document.getElementById('profUsername'),
    profNamaLengkap: document.getElementById('profNamaLengkap'),
    profNip: document.getElementById('profNip'),
    profEmail: document.getElementById('profEmail'),
    profUnit: document.getElementById('profUnit'),
    btnProfileLanjut: document.getElementById('btnProfileLanjut'),

    // Exam Grid Screen
    examGridContainer: document.getElementById('examGridContainer'),

    // Pakta Integritas Modal
    modalPaktaIntegritas: document.getElementById('modalPaktaIntegritas'),
    btnClosePaktaModal: document.getElementById('btnClosePaktaModal'),
    btnCancelPakta: document.getElementById('btnCancelPakta'),
    modalExamTitleDisplay: document.getElementById('modalExamTitleDisplay'),
    modalTokenCodeDisplay: document.getElementById('modalTokenCodeDisplay'),
    btnAutoFillToken: document.getElementById('btnAutoFillToken'),
    inputExamToken: document.getElementById('inputExamToken'),
    chkPaktaAgree: document.getElementById('chkPaktaAgree'),
    btnStartExamSubmit: document.getElementById('btnStartExamSubmit'),

    // Exam Screen
    currentSubtestStrip: document.getElementById('currentSubtestStrip'),
    currentSubtestStripIcon: document.getElementById('currentSubtestStripIcon'),
    currentSubtestStripText: document.getElementById('currentSubtestStripText'),
    navSubtestPillsContainer: document.getElementById('navSubtestPillsContainer'),
    currentQuestionNumBadge: document.getElementById('currentQuestionNumBadge'),
    currentQuestionCategoryTag: document.getElementById('currentQuestionCategoryTag'),
    currentQuestionText: document.getElementById('currentQuestionText'),
    currentOptionsContainer: document.getElementById('currentOptionsContainer'),
    btnPrevQuestion: document.getElementById('btnPrevQuestion'),
    btnNextQuestion: document.getElementById('btnNextQuestion'),
    btnMarkRagu: document.getElementById('btnMarkRagu'),
    questionNavGrid: document.getElementById('questionNavGrid'),
    statAnsweredCount: document.getElementById('statAnsweredCount'),
    statUnansweredCount: document.getElementById('statUnansweredCount'),
    statMarkedCount: document.getElementById('statMarkedCount'),
    btnKirimSelesai: document.getElementById('btnKirimSelesai'),
    proctorVideo: document.getElementById('proctor-video'),
    proctorSimPlaceholder: document.getElementById('proctorSimPlaceholder'),

    // Chat Pengawas
    chatPengawasWidget: document.getElementById('chatPengawasWidget'),
    btnToggleChat: document.getElementById('btnToggleChat'),
    chatWindow: document.getElementById('chatWindow'),
    btnCloseChat: document.getElementById('btnCloseChat'),
    chatMessagesBody: document.getElementById('chatMessagesBody'),
    chatForm: document.getElementById('chatForm'),
    chatInputText: document.getElementById('chatInputText'),

    // Result Screen
    raporStatusBanner: document.getElementById('raporStatusBanner'),
    raporStatusTitle: document.getElementById('raporStatusTitle'),
    raporStatusSubtitle: document.getElementById('raporStatusSubtitle'),
    resNamaPeserta: document.getElementById('resNamaPeserta'),
    resNipPeserta: document.getElementById('resNipPeserta'),
    resExamTitle: document.getElementById('resExamTitle'),
    resExamDate: document.getElementById('resExamDate'),
    scorePotensiVal: document.getElementById('scorePotensiVal'),
    scorePotensiThreshold: document.getElementById('scorePotensiThreshold'),
    scoreTskkwkVal: document.getElementById('scoreTskkwkVal'),
    scoreCorrectCount: document.getElementById('scoreCorrectCount'),
    scoreWrongCount: document.getElementById('scoreWrongCount'),
    scoreTotalCountLabel: document.getElementById('scoreTotalCountLabel'),
    scoreEmptyCountLabel: document.getElementById('scoreEmptyCountLabel'),
    ayangCelebrationBox: document.getElementById('ayangCelebrationBox'),
    ayangLoveMessage: document.getElementById('ayangLoveMessage'),
    inputRecipientEmail: document.getElementById('inputRecipientEmail'),
    btnSendResultEmail: document.getElementById('btnSendResultEmail'),
    btnOpenGmailWeb: document.getElementById('btnOpenGmailWeb'),
    btnCopyReportText: document.getElementById('btnCopyReportText'),
    btnDownloadTxt: document.getElementById('btnDownloadTxt'),
    emailStatusNotification: document.getElementById('emailStatusNotification'),
    btnPrintPdf: document.getElementById('btnPrintPdf'),
    btnRestartToDaftar: document.getElementById('btnRestartToDaftar'),
    reviewQuestionsContainer: document.getElementById('reviewQuestionsContainer'),
    filterAllCount: document.getElementById('filterAllCount'),
    filterWrongCount: document.getElementById('filterWrongCount'),
    filterCorrectCount: document.getElementById('filterCorrectCount'),

    // Footer
    themeToggleCheckbox: document.getElementById('themeToggleCheckbox'),
    autosaveStatusText: document.getElementById('autosaveStatusText')
  };

  // ==============================================================================
  // NAVIGATION & SCREEN SWITCHER
  // ==============================================================================
  function showScreen(screenId) {
    const screens = [
      DOM.screenLogin,
      DOM.screenProfile,
      DOM.screenDaftarUjian,
      DOM.screenRuangUjian,
      DOM.screenHasil
    ];

    screens.forEach(s => {
      if (s) s.classList.remove('active-screen');
    });

    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add('active-screen');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Header visibility rules
    if (screenId === 'screenRuangUjian') {
      DOM.navUserInfo.style.display = 'flex';
      DOM.navExamTitleBox.style.display = 'block';
      DOM.navTimerBox.style.display = 'flex';
    } else if (screenId === 'screenProfile' || screenId === 'screenDaftarUjian' || screenId === 'screenHasil') {
      DOM.navUserInfo.style.display = 'flex';
      DOM.navExamTitleBox.style.display = 'none';
      DOM.navTimerBox.style.display = 'none';
    } else {
      // Login screen
      DOM.navUserInfo.style.display = 'none';
      DOM.navExamTitleBox.style.display = 'none';
      DOM.navTimerBox.style.display = 'none';
    }
  }

  // ==============================================================================
  // PROFILE & USER DATA HANDLING
  // ==============================================================================
  function saveUserProfileFromForm() {
    AppState.user.nama = DOM.loginInputNama.value.trim();
    AppState.user.nip = DOM.loginInputNip.value.trim();
    AppState.user.email = DOM.loginInputEmail.value.trim();
    AppState.user.unit = DOM.loginInputUnit.value || "Direktorat Jenderal Perbendaharaan (DJPb)";

    // Update Profile Screen UI
    const initial = (AppState.user.nama ? AppState.user.nama.charAt(0) : 'P').toUpperCase();
    DOM.profileBigAvatar.textContent = initial;
    DOM.navAvatarCircle.textContent = initial;

    DOM.profileDisplayNama.textContent = AppState.user.nama || "Peserta Ujian";
    DOM.profNamaLengkap.textContent = AppState.user.nama || "-";
    DOM.navUserFullname.textContent = AppState.user.nama || "Peserta Ujian";

    DOM.profNip.textContent = AppState.user.nip || "-";
    DOM.navUserNip.textContent = AppState.user.nip ? ("NIP. " + AppState.user.nip) : "";

    DOM.profEmail.textContent = AppState.user.email || "-";
    DOM.profUnit.textContent = AppState.user.unit;
    DOM.profUsername.textContent = AppState.user.email ? AppState.user.email.split('@')[0] : (AppState.user.nip || "peserta");

    // Pre-fill recipient on result screen
    if (DOM.inputRecipientEmail) {
      DOM.inputRecipientEmail.value = AppState.user.email || "";
    }
  }

  // ==============================================================================
  // DAFTAR UJIAN RENDERING (SLIDE 19)
  // ==============================================================================
  function renderExamPackages() {
    const packages = ExamEngine.EXAM_PACKAGES;
    DOM.examGridContainer.innerHTML = '';

    packages.forEach(pkg => {
      const card = document.createElement('div');
      card.className = `exam-card ${pkg.featured ? 'featured-exam' : ''}`;

      let hasPotensi = false;
      let hasTskkwk = false;
      let hasPsikologi = false;

      if (pkg.subtests && Array.isArray(pkg.subtests)) {
        hasPotensi = pkg.subtests.some(s => s.id === 'potensi');
        hasTskkwk = pkg.subtests.some(s => s.id === 'tskkwk');
        hasPsikologi = pkg.subtests.some(s => s.id === 'psikologi');
      } else {
        const dist = pkg.questionDistribution || {};
        hasPotensi = Object.keys(dist).some(k => k.startsWith('potensi_'));
        hasTskkwk = Object.keys(dist).some(k => k.startsWith('tskkwk_'));
        hasPsikologi = Object.keys(dist).some(k => k.startsWith('psikologi_'));
      }

      let passPillsHtml = '';
      if (hasPotensi && pkg.thresholdPotensi) {
        passPillsHtml += `<span class="meta-pill pill-grade">🎯 Pass: Potensi ≥ ${pkg.thresholdPotensi}</span>`;
      }
      if (hasTskkwk && pkg.thresholdTskkwk) {
        passPillsHtml += `<span class="meta-pill pill-grade">🎯 Pass: TSKKWK ≥ ${pkg.thresholdTskkwk}</span>`;
      }
      if (hasPsikologi && pkg.thresholdPsikologi) {
        passPillsHtml += `<span class="meta-pill pill-grade">🎯 Pass: Psikologi ≥ ${pkg.thresholdPsikologi}</span>`;
      }

      let compHtml = '';
      if (pkg.subtests && Array.isArray(pkg.subtests)) {
        compHtml = `
          <div class="exam-composition-strip">
            <span class="comp-badge blue">📘 Potensi: 120 Soal</span>
            <span class="comp-badge green">🏛️ TSKKWK: 40 Soal</span>
            <span class="comp-badge purple">🧠 Psikologi: 40 Soal</span>
          </div>
        `;
      }

      card.innerHTML = `
        <div>
          <div class="exam-card-title">${pkg.title}</div>
          <div class="exam-card-organizer">🏛️ ${pkg.organizer}</div>
          <p style="font-size: 0.86rem; color: var(--kemenkeu-text-dark); margin: 0.5rem 0;">${pkg.description}</p>
          ${compHtml}
          <div class="exam-meta-pills">
            <span class="meta-pill pill-time">⏱️ ${pkg.durationMinutes} Menit</span>
            ${passPillsHtml}
            <span class="meta-pill">🔑 Token: ${pkg.token}</span>
          </div>
        </div>

        <button type="button" class="btn-lihat-exam" data-exam-id="${pkg.id}">
          Lihat & Mulai Tes →
        </button>
      `;

      DOM.examGridContainer.appendChild(card);
    });

    // Add click listeners to all "Lihat ->" buttons
    DOM.examGridContainer.querySelectorAll('.btn-lihat-exam').forEach(btn => {
      btn.addEventListener('click', function () {
        const examId = this.getAttribute('data-exam-id');
        openPaktaModal(examId);
      });
    });
  }

  // ==============================================================================
  // PAKTA INTEGRITAS & TOKEN MODAL (SLIDE 13)
  // ==============================================================================
  let pendingExamPackage = null;

  function openPaktaModal(examId) {
    const pkg = ExamEngine.EXAM_PACKAGES.find(p => p.id === examId) || ExamEngine.EXAM_PACKAGES[0];
    pendingExamPackage = pkg;

    DOM.modalExamTitleDisplay.textContent = pkg.title;
    DOM.modalTokenCodeDisplay.textContent = pkg.token;
    DOM.inputExamToken.value = '';
    DOM.chkPaktaAgree.checked = false;
    DOM.modalPaktaIntegritas.style.display = 'flex';
  }

  function closePaktaModal() {
    DOM.modalPaktaIntegritas.style.display = 'none';
    pendingExamPackage = null;
  }

  // ==============================================================================
  // RUANG UJIAN & KLC-CAT QUESTION RENDERER (SLIDE 20)
  // ==============================================================================
  function renderSubtestNavPills(pkg) {
    if (!DOM.navSubtestPillsContainer) return;
    DOM.navSubtestPillsContainer.innerHTML = '';

    if (!pkg.subtests || !Array.isArray(pkg.subtests)) {
      DOM.navSubtestPillsContainer.style.display = 'none';
      return;
    }

    DOM.navSubtestPillsContainer.style.display = 'flex';

    const allBtn = document.createElement('button');
    allBtn.type = 'button';
    allBtn.className = `btn-subtest-pill ${AppState.subtestFilter === 'all' ? 'active' : ''}`;
    allBtn.textContent = `Semua (${ExamEngine.questions.length})`;
    allBtn.addEventListener('click', () => {
      AppState.subtestFilter = 'all';
      updateSubtestPillActive();
      renderNavigationGrid();
    });
    DOM.navSubtestPillsContainer.appendChild(allBtn);

    pkg.subtests.forEach(sub => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `btn-subtest-pill ${AppState.subtestFilter === sub.id ? 'active' : ''}`;
      btn.textContent = `${sub.number}. ${sub.shortName}`;
      btn.title = `${sub.title} (${sub.rangeText || ''})`;
      btn.addEventListener('click', () => {
        AppState.subtestFilter = sub.id;
        updateSubtestPillActive();
        // Lompat langsung ke soal pertama di subtes ini
        const firstIdx = ExamEngine.questions.findIndex(q => q.subtestId === sub.id);
        if (firstIdx !== -1) {
          ExamEngine.currentIndex = firstIdx;
          renderCurrentQuestion();
        }
        renderNavigationGrid();
      });
      DOM.navSubtestPillsContainer.appendChild(btn);
    });
  }

  function updateSubtestPillActive() {
    if (!DOM.navSubtestPillsContainer) return;
    const buttons = DOM.navSubtestPillsContainer.querySelectorAll('.btn-subtest-pill');
    buttons.forEach((btn, idx) => {
      if (idx === 0) {
        btn.classList.toggle('active', AppState.subtestFilter === 'all');
      } else {
        const pkg = ExamEngine.activeExam;
        if (pkg && pkg.subtests && pkg.subtests[idx - 1]) {
          btn.classList.toggle('active', AppState.subtestFilter === pkg.subtests[idx - 1].id);
        }
      }
    });
  }

  function startExamSession(pkg) {
    closePaktaModal();

    // Start engine
    const session = ExamEngine.startExam(pkg.id);
    AppState.subtestFilter = 'all';

    // Update Navbar headers
    DOM.navExamTitle.textContent = pkg.title.toUpperCase();
    DOM.navSubtestTitle.textContent = `DURASI: ${pkg.durationMinutes} MENIT • JUMLAH SOAL: ${session.totalQuestions} BUTIR`;

    // Initialize Timer
    startExamTimer(pkg.durationMinutes * 60);

    // Start Autosave Interval (every 60s per Slide 20)
    startAutosaveLoop();

    // Start Camera Proctoring
    initCameraProctoring();

    // Render Subtest Pills & Question & Navigation Grid
    renderSubtestNavPills(pkg);
    renderCurrentQuestion();
    renderNavigationGrid();
    updateStatisticsCounts();

    showScreen('screenRuangUjian');
  }

  function startExamTimer(totalSeconds) {
    if (AppState.examTimer) clearInterval(AppState.examTimer);
    let secondsLeft = totalSeconds;

    function updateDisplay() {
      const hours = Math.floor(secondsLeft / 3600);
      const mins = Math.floor((secondsLeft % 3600) / 60);
      const secs = secondsLeft % 60;

      const formatted = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      DOM.examTimerDisplay.textContent = formatted;

      // Sisa 5 menit: Berkedip merah (Slide 7)
      if (secondsLeft <= 300) {
        DOM.navTimerBox.classList.add('warning-time');
      } else {
        DOM.navTimerBox.classList.remove('warning-time');
      }

      ExamEngine.remainingSeconds = secondsLeft;
    }

    updateDisplay();

    AppState.examTimer = setInterval(() => {
      secondsLeft--;
      updateDisplay();

      if (secondsLeft <= 0) {
        clearInterval(AppState.examTimer);
        alert("Waktu pengerjaan ujian telah habis! Sistem akan mengumpulkan jawaban Anda secara otomatis.");
        finishExamSession();
      }
    }, 1000);
  }

  function startAutosaveLoop() {
    setInterval(() => {
      ExamEngine.saveStateToStorage();
      const now = new Date();
      const timeStr = now.toLocaleTimeString('id-ID');
      DOM.autosaveStatusText.textContent = `✓ Jawaban Anda terkirim otomatis (${timeStr})`;
    }, 60000); // Setiap 60 detik (Slide 20)
  }

  function renderCurrentQuestion() {
    const qObj = ExamEngine.getCurrentQuestion();
    if (!qObj) return;

    const { index, total, data, selectedAnswer, isMarked } = qObj;

    // Subtest Active Banner
    const subtestId = data.subtestId || (data.category && data.category.startsWith('potensi_') ? 'potensi' : (data.category && data.category.startsWith('psikologi_') ? 'psikologi' : 'tskkwk'));
    const subtestTitle = data.subtestTitle || (subtestId === 'potensi' ? 'Subtes I: Tes Potensi Akademik (120 Soal)' : (subtestId === 'psikologi' ? 'Subtes III: Tes Psikologi & Integritas ASN (40 Soal)' : 'Subtes II: TSKKWK & Kebijakan Perbendaharaan (40 Soal)'));
    const subtestIcon = (subtestId === 'potensi') ? '📘' : (subtestId === 'psikologi' ? '🧠' : '🏛️');

    if (DOM.currentSubtestStrip) {
      DOM.currentSubtestStrip.className = `subtest-strip-banner subtest-${subtestId}`;
      if (DOM.currentSubtestStripText) DOM.currentSubtestStripText.textContent = subtestTitle;
      if (DOM.currentSubtestStripIcon) DOM.currentSubtestStripIcon.textContent = subtestIcon;
    }

    if (DOM.navSubtestTitle) {
      DOM.navSubtestTitle.textContent = `${subtestTitle.toUpperCase()} • SOAL ${index + 1} DARI ${total}`;
    }

    // Badges & Categories
    DOM.currentQuestionNumBadge.textContent = `Soal ${index + 1} dari ${total}`;
    DOM.currentQuestionCategoryTag.textContent = `${data.categoryName} (${data.year || 'UPKP'})`;

    // Question Text
    DOM.currentQuestionText.textContent = data.question;

    // Options (A, B, C, D, E)
    DOM.currentOptionsContainer.innerHTML = '';
    const options = data.options || [];

    options.forEach((optStr, optIdx) => {
      // Parse Letter (A/B/C/D/E)
      const letterMatch = optStr.match(/^([A-E])\.\s*(.*)/i);
      const letter = letterMatch ? letterMatch[1].toUpperCase() : String.fromCharCode(65 + optIdx);
      const textOnly = letterMatch ? letterMatch[2] : optStr;

      const isSelected = (selectedAnswer === letter);

      const row = document.createElement('label');
      row.className = `option-item-row ${isSelected ? 'selected-option' : ''}`;
      row.htmlFor = `opt_radio_${letter}`;

      row.innerHTML = `
        <input type="radio" name="opt_choice" id="opt_radio_${letter}" value="${letter}" class="option-radio" ${isSelected ? 'checked' : ''}>
        <div class="option-text-content">
          <strong>${letter}.</strong> ${textOnly}
        </div>
      `;

      row.addEventListener('click', (e) => {
        // Prevent double triggers
        if (e.target.tagName !== 'INPUT') {
          const radio = row.querySelector('input');
          if (radio) radio.checked = true;
        }
        ExamEngine.answerQuestion(index, letter);
        highlightSelectedOption(letter);
        renderNavigationGrid();
        updateStatisticsCounts();
      });

      DOM.currentOptionsContainer.appendChild(row);
    });

    // Mark Button State
    if (isMarked) {
      DOM.btnMarkRagu.classList.add('is-marked');
      DOM.btnMarkRagu.textContent = '🚩 Ditandai (Ragu-ragu)';
    } else {
      DOM.btnMarkRagu.classList.remove('is-marked');
      DOM.btnMarkRagu.textContent = '🚩 Tandai (Ragu-ragu)';
    }

    // Prev / Next button states
    DOM.btnPrevQuestion.disabled = (index === 0);
    DOM.btnNextQuestion.textContent = (index === total - 1) ? 'Selesai →' : 'Lanjut →';
  }

  function highlightSelectedOption(letter) {
    const rows = DOM.currentOptionsContainer.querySelectorAll('.option-item-row');
    rows.forEach(r => {
      const radio = r.querySelector('input');
      if (radio && radio.value === letter) {
        r.classList.add('selected-option');
      } else {
        r.classList.remove('selected-option');
      }
    });
  }

  // Navigation Grid (Slide 20: Biru = Sudah, Oranye = Ragu/Sedang, Abu-abu = Belum)
  function renderNavigationGrid() {
    const total = ExamEngine.questions.length;
    DOM.questionNavGrid.innerHTML = '';
    const filter = AppState.subtestFilter || 'all';

    for (let i = 0; i < total; i++) {
      const q = ExamEngine.questions[i];
      const qSubtestId = q.subtestId || (q.category && q.category.startsWith('potensi_') ? 'potensi' : (q.category && q.category.startsWith('psikologi_') ? 'psikologi' : 'tskkwk'));

      if (filter !== 'all' && qSubtestId !== filter) {
        continue;
      }

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = (i + 1);

      const hasAnswer = !!ExamEngine.userAnswers[i];
      const isMarked = !!ExamEngine.markedQuestions[i];
      const isCurrent = (ExamEngine.currentIndex === i);

      let statusClass = 'status-unanswered'; // Default Abu-abu
      if (isMarked) {
        statusClass = 'status-marked';       // Orange
      } else if (hasAnswer) {
        statusClass = 'status-answered';     // Biru
      }

      btn.className = `q-nav-btn ${statusClass} ${isCurrent ? 'current-active' : ''}`;

      btn.addEventListener('click', () => {
        ExamEngine.currentIndex = i;
        renderCurrentQuestion();
        renderNavigationGrid();
      });

      DOM.questionNavGrid.appendChild(btn);
    }
  }

  // Update Statistics Box (Slide 20)
  function updateStatisticsCounts() {
    let answered = 0;
    let marked = 0;
    const total = ExamEngine.questions.length;

    for (let i = 0; i < total; i++) {
      if (ExamEngine.markedQuestions[i]) marked++;
      else if (ExamEngine.userAnswers[i]) answered++;
    }

    const unanswered = total - (answered + marked);

    DOM.statAnsweredCount.textContent = answered;
    DOM.statUnansweredCount.textContent = unanswered;
    DOM.statMarkedCount.textContent = marked;
  }

  // ==============================================================================
  // FINISH EXAM & EVALUATION (SLIDE 3 & USER REQUEST)
  // ==============================================================================
  function finishExamSession() {
    if (AppState.examTimer) clearInterval(AppState.examTimer);

    // Compute results
    const results = ExamEngine.calculateResults();
    AppState.lastResultData = {
      user: AppState.user,
      exam: ExamEngine.activeExam,
      stats: results.stats,
      reviewList: results.reviewList
    };

    // Populate Results Screen
    displayExamResults(AppState.lastResultData);
    showScreen('screenHasil');
  }

  function displayExamResults(data) {
    const { user, exam, stats, reviewList } = data;

    DOM.resNamaPeserta.textContent = user.nama;
    DOM.resNipPeserta.textContent = user.nip;
    DOM.resExamTitle.textContent = exam.title;
    DOM.resExamDate.textContent = new Date().toLocaleDateString('id-ID', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    // Score metrics
    const cardPotensi = document.getElementById('cardScorePotensi');
    const cardTskkwk = document.getElementById('cardScoreTskkwk');
    const cardPsikologi = document.getElementById('cardScorePsikologi');

    if (stats.potensiTotal > 0) {
      if (cardPotensi) cardPotensi.style.display = 'block';
      DOM.scorePotensiVal.textContent = stats.scorePotensi;
      DOM.scorePotensiThreshold.textContent = `Ambang Batas: ≥ ${exam.thresholdPotensi || 475} (${stats.passPotensi ? 'MEMENUHI' : 'BELUM'})`;
    } else {
      if (cardPotensi) cardPotensi.style.display = 'none';
    }

    if (stats.tskkwkTotal > 0) {
      if (cardTskkwk) cardTskkwk.style.display = 'block';
      DOM.scoreTskkwkVal.textContent = stats.scoreTskkwk;
      const tskkwkThresh = document.getElementById('scoreTskkwkThreshold');
      if (tskkwkThresh) tskkwkThresh.textContent = `Ambang Batas: ≥ ${exam.thresholdTskkwk || 70.0} (${stats.passTskkwk ? 'MEMENUHI' : 'BELUM'})`;
    } else {
      if (cardTskkwk) cardTskkwk.style.display = 'none';
    }

    if (stats.psikologiTotal > 0) {
      if (cardPsikologi) cardPsikologi.style.display = 'block';
      const psikoVal = document.getElementById('scorePsikologiVal');
      const psikoThresh = document.getElementById('scorePsikologiThreshold');
      if (psikoVal) psikoVal.textContent = stats.scorePsikologi;
      if (psikoThresh) psikoThresh.textContent = `Ambang Batas: ≥ ${exam.thresholdPsikologi || 70.0} (${stats.passPsikologi ? 'MEMENUHI' : 'BELUM'})`;
    } else {
      if (cardPsikologi) cardPsikologi.style.display = 'none';
    }

    DOM.scoreCorrectCount.textContent = stats.correctCount;
    DOM.scoreWrongCount.textContent = stats.wrongCount;
    DOM.scoreTotalCountLabel.textContent = `dari total ${stats.totalQuestions} soal (${stats.accuracy}% akurat)`;
    DOM.scoreEmptyCountLabel.textContent = `Kosong / Belum dijawab: ${stats.unansweredCount} soal`;

    // Pass / Fail Banner (Slide 3)
    if (stats.isLulus) {
      DOM.raporStatusBanner.className = 'rapor-banner-status lulus';
      DOM.raporStatusTitle.textContent = "SELAMAT! MEMENUHI AMBANG BATAS KELULUSAN (PASSING GRADE)";
      DOM.raporStatusSubtitle.textContent = "Direkomendasikan Lulus Ujian Penyesuaian Kenaikan Pangkat (UPKP) Kemenkeu Tahun 2026!";
    } else {
      DOM.raporStatusBanner.className = 'rapor-banner-status tidak-lulus';
      DOM.raporStatusTitle.textContent = "BELUM MEMENUHI AMBANG BATAS KELULUSAN";
      const reqMsg = [];
      if (stats.potensiTotal > 0) reqMsg.push(`Potensi ≥ ${exam.thresholdPotensi || 475}`);
      if (stats.tskkwkTotal > 0) reqMsg.push(`TSKKWK ≥ ${exam.thresholdTskkwk || 70.0}`);
      if (stats.psikologiTotal > 0) reqMsg.push(`Psikologi ≥ ${exam.thresholdPsikologi || 70.0}`);
      DOM.raporStatusSubtitle.textContent = `Perlu perbaikan nilai (Syarat: ${reqMsg.join(', ')}).`;
    }

    // Love message for Ayang
    DOM.ayangLoveMessage.textContent = stats.loveMessage;

    // Filter counts
    DOM.filterAllCount.textContent = stats.totalQuestions;
    DOM.filterWrongCount.textContent = stats.wrongCount;
    DOM.filterCorrectCount.textContent = stats.correctCount;

    // Render Question Review
    renderReviewQuestions(reviewList, AppState.reviewFilter);
  }

  function renderReviewQuestions(reviewList, filter) {
    DOM.reviewQuestionsContainer.innerHTML = '';

    const filtered = reviewList.filter(item => {
      if (filter === 'wrong') return !item.isCorrect;
      if (filter === 'correct') return item.isCorrect;
      return true; // 'all'
    });

    if (filtered.length === 0) {
      DOM.reviewQuestionsContainer.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: var(--kemenkeu-text-muted);">
          Tidak ada butir soal dalam kategori filter ini.
        </div>
      `;
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('div');
      let statusClass = 'is-unanswered';
      let badgeHtml = '<span class="review-q-badge badge-unanswered">TIDAK DIJAWAB</span>';

      if (item.userAnswer) {
        if (item.isCorrect) {
          statusClass = 'is-correct';
          badgeHtml = '<span class="review-q-badge badge-correct">✓ BENAR</span>';
        } else {
          statusClass = 'is-wrong';
          badgeHtml = '<span class="review-q-badge badge-wrong">✗ SALAH</span>';
        }
      }

      card.className = `review-q-card ${statusClass}`;

      let optionsHtml = '';
      if (item.options && item.options.length) {
        optionsHtml = '<div style="margin: 0.75rem 0; font-size: 0.88rem; display: flex; flex-direction: column; gap: 4px;">';
        item.options.forEach(opt => {
          const letter = (opt.match(/^([A-E])\./i) || [])[1] || '';
          let optClass = 'review-opt-line';
          if (letter.toUpperCase() === item.correctAnswer.toUpperCase()) {
            optClass += ' review-opt-correct';
          } else if (item.userAnswer && letter.toUpperCase() === item.userAnswer.toUpperCase()) {
            optClass += ' review-opt-wrong';
          }
          optionsHtml += `<div class="${optClass}">${opt}</div>`;
        });
        optionsHtml += '</div>';
      }

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <div>
            <span class="meta-pill" style="font-size: 0.72rem; margin-right: 6px; background: var(--kemenkeu-hover); border-color: var(--kemenkeu-border);">${item.subtestShortName || 'UPKP'}</span>
            <strong style="color: var(--kemenkeu-blue);">Butir Soal #${item.number} • ${item.categoryName}</strong>
          </div>
          ${badgeHtml}
        </div>
        <div style="font-weight: 500; margin-bottom: 0.5rem; line-height: 1.5;">${item.question}</div>
        ${optionsHtml}
        <div style="font-size: 0.85rem; margin-top: 0.5rem;">
          <strong>Jawaban Peserta:</strong> <span style="font-weight: 700;">${item.userAnswer || '(Kosong / Tidak Dijawab)'}</span> | 
          <strong>Kunci Resmi:</strong> <span style="font-weight: 800; color: #10b981;">${item.correctAnswer}</span>
        </div>
        <div class="review-pembahasan-box">
          <div class="pembahasan-label">📖 Pembahasan & Penjelasan Resmi:</div>
          <div>${item.explanation}</div>
        </div>
      `;

      DOM.reviewQuestionsContainer.appendChild(card);
    });
  }

  // ==============================================================================
  // EMAIL SENDING & REPORT PRINTING (USER REQUEST)
  // ==============================================================================
  function showEmailNotification(msg, type) {
    if (!DOM.emailStatusNotification) return;
    DOM.emailStatusNotification.style.display = 'block';
    DOM.emailStatusNotification.textContent = msg;

    if (type === 'success') {
      DOM.emailStatusNotification.style.background = '#d1fae5';
      DOM.emailStatusNotification.style.color = '#065f46';
      DOM.emailStatusNotification.style.border = '1px solid #10b981';
    } else if (type === 'error') {
      DOM.emailStatusNotification.style.background = '#fee2e2';
      DOM.emailStatusNotification.style.color = '#991b1b';
      DOM.emailStatusNotification.style.border = '1px solid #ef4444';
    } else {
      DOM.emailStatusNotification.style.background = '#e0f2fe';
      DOM.emailStatusNotification.style.color = '#0369a1';
      DOM.emailStatusNotification.style.border = '1px solid #38bdf8';
    }
  }

  async function handleSendEmail() {
    if (!AppState.lastResultData) {
      showEmailNotification("Belum ada data hasil ujian untuk dikirimkan.", "error");
      return;
    }

    const email = DOM.inputRecipientEmail.value.trim();
    if (!email || !email.includes('@')) {
      showEmailNotification("Harap masukkan alamat email yang valid!", "error");
      DOM.inputRecipientEmail.focus();
      return;
    }

    DOM.btnSendResultEmail.disabled = true;
    DOM.btnSendResultEmail.innerHTML = `⏳ Memproses...`;
    showEmailNotification(`Sedang memproses pengiriman rapor untuk: ${email}...`, "info");

    try {
      const res = await window.EmailService.sendViaWebApi(email, AppState.lastResultData);
      if (res && res.success) {
        showEmailNotification(`✓ Rapor resmi hasil evaluasi UPKP berhasil dicatat dan diproses untuk email: ${email}! Salinan berkas tersimpan di folder logs.`, "success");
        return;
      }

      // Fallback: Mailto client dengan teks ringkas terstandar (aman dari batas karakter URL)
      window.EmailService.sendViaMailto(email, AppState.lastResultData);
      showEmailNotification(`✓ Draf laporan resmi telah disiapkan untuk ${email}. Aplikasi email Anda telah dibuka otomatis. Anda juga dapat menggunakan tombol 'Gmail Web' atau 'Salin Rapor' di sebelah kanan.`, "success");
    } catch (err) {
      window.EmailService.sendViaMailto(email, AppState.lastResultData);
      showEmailNotification(`Draf email telah dibuka. Silakan klik tombol 'Kirim' pada aplikasi email Anda.`, "info");
    } finally {
      DOM.btnSendResultEmail.disabled = false;
      DOM.btnSendResultEmail.innerHTML = `✉️ Kirim ke Email`;
    }
  }

  function handleOpenGmailWeb() {
    if (!AppState.lastResultData) {
      showEmailNotification("Belum ada data hasil ujian untuk dibuka.", "error");
      return;
    }
    const email = DOM.inputRecipientEmail.value.trim() || AppState.user.email;
    if (!email || !email.includes('@')) {
      showEmailNotification("Harap masukkan alamat email tujuan terlebih dahulu!", "error");
      DOM.inputRecipientEmail.focus();
      return;
    }

    window.EmailService.openGmailWeb(email, AppState.lastResultData);
    showEmailNotification(`✓ Tab baru Gmail Web telah dibuka dengan draf rapor resmi untuk ${email}. Silakan klik 'Kirim' di tab Gmail tersebut.`, "success");
  }

  async function handleCopyReportText() {
    if (!AppState.lastResultData) {
      showEmailNotification("Belum ada data hasil ujian untuk disalin.", "error");
      return;
    }

    const ok = await window.EmailService.copyReportToClipboard(AppState.lastResultData);
    if (ok) {
      showEmailNotification("✓ Seluruh isi rapor lengkap (termasuk 200 pembahasan butir soal) berhasil disalin ke clipboard! Silakan paste (Ctrl+V) di Word, WhatsApp, atau Email Anda.", "success");
    } else {
      showEmailNotification("Gagal menyalin otomatis. Silakan gunakan tombol Unduh File (.txt).", "error");
    }
  }

  function handleDownloadTxt() {
    if (!AppState.lastResultData) {
      showEmailNotification("Belum ada data hasil ujian untuk diunduh.", "error");
      return;
    }

    window.EmailService.downloadReportTxt(AppState.lastResultData);
    showEmailNotification("✓ Berkas teks rapor resmi (.txt) lengkap dengan seluruh pembahasan soal berhasil diunduh ke komputer Anda!", "success");
  }

  // ==============================================================================
  // AI PROCTORING WEBCAM INITIALIZATION (SLIDE 11)
  // ==============================================================================
  function initCameraProctoring() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          DOM.proctorVideo.srcObject = stream;
          DOM.proctorVideo.style.display = 'block';
          DOM.proctorSimPlaceholder.style.display = 'none';
        })
        .catch(err => {
          // Camera disabled / permission denied -> fallback to simulated feed
          DOM.proctorVideo.style.display = 'none';
          DOM.proctorSimPlaceholder.style.display = 'block';
        });
    }
  }

  // ==============================================================================
  // CHAT DENGAN PENGAWAS INTERACTIVE REPLIES (SLIDE 11)
  // ==============================================================================
  function setupChatPengawas() {
    DOM.btnToggleChat.addEventListener('click', () => {
      DOM.chatWindow.classList.toggle('open-chat');
    });

    DOM.btnCloseChat.addEventListener('click', () => {
      DOM.chatWindow.classList.remove('open-chat');
    });

    DOM.chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = DOM.chatInputText.value.trim();
      if (!text) return;

      // Add user message
      appendChatMessage(text, 'ayang');
      DOM.chatInputText.value = '';

      // Auto reply from Pengawas after 700ms
      setTimeout(() => {
        const reply = generatePengawasReply(text);
        appendChatMessage(reply, 'pengawas');
      }, 700);
    });
  }

  function appendChatMessage(msg, senderClass) {
    const div = document.createElement('div');
    div.className = `chat-msg ${senderClass}`;
    div.textContent = msg;
    DOM.chatMessagesBody.appendChild(div);
    DOM.chatMessagesBody.scrollTop = DOM.chatMessagesBody.scrollHeight;
  }

  function generatePengawasReply(userMsg) {
    const lower = userMsg.toLowerCase();
    if (lower.includes('token')) {
      return "Token resmi subtes adalah UPKP26 atau sesuai yang tertera pada kotak token ujian. Silakan gunakan tombol salin token di layar.";
    }
    if (lower.includes('waktu') || lower.includes('jam')) {
      return "Sisa waktu pengerjaan tertera pada kotak indikator kuning di pojok kanan atas. Harap manfaatkan waktu yang tersedia secara optimal.";
    }
    if (lower.includes('ragu') || lower.includes('tanda')) {
      return "Tombol Tandai (Ragu-ragu) dapat Anda klik agar nomor soal berubah menjadi warna oranye pada menu navigasi.";
    }
    return "Laporan diterima oleh Pengawas Ruang Ujian. Silakan lanjutkan pengerjaan soal dengan teliti dan tertib.";
  }

  // ==============================================================================
  // ZOOM & SEB FULLSCREEN TOOLS (SLIDE 21)
  // ==============================================================================
  function adjustFontSize(delta) {
    AppState.fontSizeLevel = Math.max(0.85, Math.min(1.6, AppState.fontSizeLevel + delta));
    document.documentElement.style.setProperty('--font-size-q', `${AppState.fontSizeLevel}rem`);
  }

  function updateFullscreenIcon() {
    const isFull = !!document.fullscreenElement;
    if (DOM.btnToggleFullscreen) {
      DOM.btnToggleFullscreen.title = isFull 
        ? "Keluar Layar Penuh (Esc / F11)" 
        : "Layar Penuh / Safe Exam Browser Mode (F11)";
      DOM.btnToggleFullscreen.setAttribute('aria-label', isFull ? "Keluar Layar Penuh" : "Layar Penuh Safe Exam Browser");
      DOM.btnToggleFullscreen.innerHTML = isFull
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>`;
    }
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  }

  document.addEventListener('fullscreenchange', updateFullscreenIcon);

  // ==============================================================================
  // THEME MANAGEMENT (DARK / LIGHT MODE)
  // ==============================================================================
  function applyTheme(themeName) {
    const isDark = (themeName === 'dark');
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
    try {
      localStorage.setItem('KLC_CAT_THEME', isDark ? 'dark' : 'light');
    } catch (e) {}

    if (DOM.themeToggleCheckbox) {
      DOM.themeToggleCheckbox.checked = isDark;
    }
    if (DOM.navThemeIcon) {
      DOM.navThemeIcon.textContent = isDark ? '☀️' : '🌙';
    }
    if (DOM.navThemeText) {
      DOM.navThemeText.textContent = isDark ? 'Mode Terang' : 'Mode Gelap';
    }
    if (DOM.btnNavThemeToggle) {
      DOM.btnNavThemeToggle.title = isDark ? 'Beralih ke Mode Terang (Alt+T)' : 'Beralih ke Mode Gelap (Alt+T)';
    }
  }

  function toggleTheme() {
    const current = document.body.getAttribute('data-theme') || 'light';
    const target = current === 'dark' ? 'light' : 'dark';
    applyTheme(target);
  }

  function initTheme() {
    let savedTheme = null;
    try {
      savedTheme = localStorage.getItem('KLC_CAT_THEME');
    } catch (e) {}

    if (!savedTheme) {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        savedTheme = 'dark';
      } else {
        savedTheme = 'light';
      }
    }
    applyTheme(savedTheme);
  }

  // ==============================================================================
  // EVENT LISTENERS BINDING
  // ==============================================================================
  function setupEventListeners() {
    // Zoom tools
    DOM.btnZoomIn.addEventListener('click', () => adjustFontSize(0.1));
    DOM.btnZoomOut.addEventListener('click', () => adjustFontSize(-0.1));
    DOM.btnToggleFullscreen.addEventListener('click', toggleFullscreen);

    // Keyboard shortcuts for zoom
    window.addEventListener('keydown', (e) => {
      if (e.ctrlKey && (e.key === '=' || e.key === '+')) {
        e.preventDefault();
        adjustFontSize(0.1);
      } else if (e.ctrlKey && e.key === '-') {
        e.preventDefault();
        adjustFontSize(-0.1);
      }
    });

    // Theme toggle via Top Navbar Button
    if (DOM.btnNavThemeToggle) {
      DOM.btnNavThemeToggle.addEventListener('click', toggleTheme);
    }

    // Theme toggle via Footer Switch
    if (DOM.themeToggleCheckbox) {
      DOM.themeToggleCheckbox.addEventListener('change', function () {
        applyTheme(this.checked ? 'dark' : 'light');
      });
    }

    // Keyboard shortcuts for Dark Mode (Alt+T or Ctrl+Shift+D)
    window.addEventListener('keydown', (e) => {
      if ((e.altKey && (e.key === 't' || e.key === 'T')) ||
          (e.ctrlKey && e.shiftKey && (e.key === 'd' || e.key === 'D'))) {
        e.preventDefault();
        toggleTheme();
      }
    });

    // Quick Login Submit
    DOM.quickLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nama = DOM.loginInputNama.value.trim();
      const nip = DOM.loginInputNip.value.trim();
      const email = DOM.loginInputEmail.value.trim();
      const unit = DOM.loginInputUnit.value;

      if (!nama) {
        alert("Silakan masukkan Nama Lengkap Anda.");
        DOM.loginInputNama.focus();
        return;
      }
      if (!nip) {
        alert("Silakan masukkan NIP Anda (18 Digit).");
        DOM.loginInputNip.focus();
        return;
      }
      if (!email) {
        alert("Silakan masukkan Alamat Email Anda.");
        DOM.loginInputEmail.focus();
        return;
      }
      if (!unit) {
        alert("Silakan pilih Unit Kerja Eselon I / Kantor Anda.");
        DOM.loginInputUnit.focus();
        return;
      }

      saveUserProfileFromForm();
      showScreen('screenProfile');
    });

    DOM.btnShowKemenkeuModal.addEventListener('click', () => {
      const nama = DOM.loginInputNama.value.trim();
      const nip = DOM.loginInputNip.value.trim();
      const email = DOM.loginInputEmail.value.trim();
      const unit = DOM.loginInputUnit.value;

      if (!nama || !nip || !email || !unit) {
        DOM.loginInputNama.focus();
        alert("Silakan lengkapi formulir login di bawah (Nama, NIP, Email, dan Unit Kerja) terlebih dahulu.");
        return;
      }
      saveUserProfileFromForm();
      showScreen('screenProfile');
    });

    DOM.btnGoogleLogin.addEventListener('click', () => {
      const nama = DOM.loginInputNama.value.trim();
      const nip = DOM.loginInputNip.value.trim();
      const email = DOM.loginInputEmail.value.trim();
      const unit = DOM.loginInputUnit.value;

      if (!nama || !nip || !email || !unit) {
        DOM.loginInputNama.focus();
        alert("Silakan lengkapi formulir login di bawah (Nama, NIP, Email, dan Unit Kerja) terlebih dahulu.");
        return;
      }
      saveUserProfileFromForm();
      showScreen('screenProfile');
    });

    DOM.btnCekPerangkat.addEventListener('click', () => {
      alert("✓ Pengecekan Perangkat:\n• Sistem Operasi: Windows 10/11 Terdeteksi\n• Browser: Kompatibel KLC-CAT\n• Jaringan: Terhubung Aman\n• Safe Exam Browser: Siap");
    });

    // Profile Screen -> Daftar Ujian
    DOM.btnProfileLanjut.addEventListener('click', () => {
      renderExamPackages();
      showScreen('screenDaftarUjian');
    });

    // Pakta Modal Listeners
    DOM.btnClosePaktaModal.addEventListener('click', closePaktaModal);
    DOM.btnCancelPakta.addEventListener('click', closePaktaModal);

    DOM.btnAutoFillToken.addEventListener('click', () => {
      if (pendingExamPackage) {
        DOM.inputExamToken.value = pendingExamPackage.token;
        DOM.chkPaktaAgree.checked = true;
      }
    });

    DOM.btnStartExamSubmit.addEventListener('click', () => {
      if (!DOM.chkPaktaAgree.checked) {
        alert("Harap centang persetujuan Pakta Integritas terlebih dahulu!");
        return;
      }

      const inputToken = DOM.inputExamToken.value.trim().toUpperCase();
      if (!inputToken) {
        alert("Harap masukkan token ujian!");
        return;
      }

      if (pendingExamPackage && inputToken !== pendingExamPackage.token) {
        alert(`Token yang Anda masukkan salah! Token resmi untuk subtes ini adalah: ${pendingExamPackage.token}`);
        return;
      }

      startExamSession(pendingExamPackage);
    });

    // Exam Nav Buttons
    DOM.btnPrevQuestion.addEventListener('click', () => {
      if (ExamEngine.currentIndex > 0) {
        ExamEngine.currentIndex--;
        renderCurrentQuestion();
        renderNavigationGrid();
      }
    });

    DOM.btnNextQuestion.addEventListener('click', () => {
      if (ExamEngine.currentIndex < ExamEngine.questions.length - 1) {
        ExamEngine.currentIndex++;
        renderCurrentQuestion();
        renderNavigationGrid();
      } else {
        // Last question -> prompt to finish
        if (confirm("Apakah Anda yakin ingin menyelesaikan dan mengirimkan seluruh lembar jawaban ujian ini?")) {
          finishExamSession();
        }
      }
    });

    DOM.btnMarkRagu.addEventListener('click', () => {
      ExamEngine.toggleMark(ExamEngine.currentIndex);
      renderCurrentQuestion();
      renderNavigationGrid();
      updateStatisticsCounts();
    });

    DOM.btnKirimSelesai.addEventListener('click', () => {
      const unanswered = ExamEngine.questions.length - Object.keys(ExamEngine.userAnswers).length;
      let msg = "Apakah Anda yakin ingin mengakhiri dan mengirimkan jawaban ujian ini?";
      if (unanswered > 0) {
        msg += `\n(Perhatian: Masih ada ${unanswered} butir soal yang belum Anda jawab!)`;
      }
      if (confirm(msg)) {
        finishExamSession();
      }
    });

    // Result screen buttons
    DOM.btnSendResultEmail.addEventListener('click', handleSendEmail);
    if (DOM.btnOpenGmailWeb) DOM.btnOpenGmailWeb.addEventListener('click', handleOpenGmailWeb);
    if (DOM.btnCopyReportText) DOM.btnCopyReportText.addEventListener('click', handleCopyReportText);
    if (DOM.btnDownloadTxt) DOM.btnDownloadTxt.addEventListener('click', handleDownloadTxt);
    DOM.btnPrintPdf.addEventListener('click', () => window.print());
    DOM.btnRestartToDaftar.addEventListener('click', () => {
      renderExamPackages();
      showScreen('screenDaftarUjian');
    });

    // Review filters
    document.querySelectorAll('.btn-filter-review').forEach(btn => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.btn-filter-review').forEach(b => b.classList.remove('active-filter'));
        this.classList.add('active-filter');
        AppState.reviewFilter = this.getAttribute('data-filter');
        if (AppState.lastResultData) {
          renderReviewQuestions(AppState.lastResultData.reviewList, AppState.reviewFilter);
        }
      });
    });

    // Chat Pengawas setup
    setupChatPengawas();
  }

  // ==============================================================================
  // APP INITIALIZATION
  // ==============================================================================
  function initApp() {
    initTheme();
    if (DOM.loginInputNama) DOM.loginInputNama.value = "";
    if (DOM.loginInputNip) DOM.loginInputNip.value = "";
    if (DOM.loginInputEmail) DOM.loginInputEmail.value = "";
    if (DOM.loginInputUnit) DOM.loginInputUnit.selectedIndex = 0;
    setupEventListeners();
    showScreen('screenLogin');
  }

  document.addEventListener('DOMContentLoaded', initApp);
})();
