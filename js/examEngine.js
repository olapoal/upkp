/**
 * examEngine.js
 * Engine Pengelolaan Ujian UPKP Kemenkeu Perbendaharaan (KLC-CAT Engine)
 */

const ExamEngine = {
  // Definisi Paket Ujian Sesuai Ketentuan Slide 3 & Slide 7
  EXAM_PACKAGES: [
    {
      id: "upkp-v-2026",
      title: "UPKP V Tahun 2026 - Ditjen Perbendaharaan",
      organizer: "P3K - Pusdiklat Kepemimpinan dan Manajerial - BPPK",
      description: "Simulasi Penuh Ujian Penyesuaian Kenaikan Pangkat Tingkat V Ditjen Perbendaharaan. Mencakup Tes Potensi (Verbal, Numerik, Analitikal) dan TSKKWK.",
      durationMinutes: 120, // 2 Jam
      thresholdPotensi: 475, // Ambang batas Slide 3
      thresholdTskkwk: 70.0,  // Ambang batas Slide 3
      token: "UPKP26",
      featured: true,
      questionDistribution: {
        potensi_verbal: 12,
        potensi_numerik: 18,
        potensi_figural_analitikal: 10,
        tskkwk_perbendaharaan_modern: 12,
        tskkwk_tusi_kemenkeu: 15,
        tskkwk_nilai_kemenkeu: 12,
        tskkwk_kepegawaian: 13,
        tskkwk_etika_pns: 10,
        tskkwk_wawasan_kebangsaan: 10
      }
    },
    {
      id: "upkp-iv-2026",
      title: "UPKP IV Tahun 2026 - Ditjen Perbendaharaan",
      organizer: "P3K - Pusdiklat Kepemimpinan dan Manajerial - BPPK",
      description: "Simulasi Ujian Penyesuaian Kenaikan Pangkat Tingkat IV. Ambang batas kelulusan: Nilai Potensi ≥ 450, TSKKWK ≥ 70.",
      durationMinutes: 120,
      thresholdPotensi: 450, // Ambang batas Slide 3
      thresholdTskkwk: 70.0,
      token: "UPKP26",
      featured: false,
      questionDistribution: {
        potensi_verbal: 10,
        potensi_numerik: 15,
        potensi_figural_analitikal: 8,
        tskkwk_perbendaharaan_modern: 10,
        tskkwk_tusi_kemenkeu: 12,
        tskkwk_nilai_kemenkeu: 10,
        tskkwk_kepegawaian: 10,
        tskkwk_etika_pns: 8,
        tskkwk_wawasan_kebangsaan: 8
      }
    },
    {
      id: "upkp-vi-2026",
      title: "UPKP VI Tahun 2026 - Ditjen Perbendaharaan",
      organizer: "P3K - Pusdiklat Kepemimpinan dan Manajerial - BPPK",
      description: "Simulasi Ujian Penyesuaian Kenaikan Pangkat Tingkat VI. Ambang batas kelulusan: Nilai Potensi ≥ 475, TSKKWK ≥ 70.",
      durationMinutes: 120,
      thresholdPotensi: 475,
      thresholdTskkwk: 70.0,
      token: "UPKP26",
      featured: false,
      questionDistribution: {
        potensi_verbal: 12,
        potensi_numerik: 18,
        potensi_figural_analitikal: 10,
        tskkwk_perbendaharaan_modern: 12,
        tskkwk_tusi_kemenkeu: 15,
        tskkwk_nilai_kemenkeu: 12,
        tskkwk_kepegawaian: 13,
        tskkwk_etika_pns: 10,
        tskkwk_wawasan_kebangsaan: 10
      }
    },
    {
      id: "regulasi-2021-2025",
      title: "Bank Regulasi Perbendaharaan 2021 - 2025",
      organizer: "Ditjen Perbendaharaan - Kementerian Keuangan",
      description: "Khusus pendalaman materi dan regulasi terkini: SAKTI, SPAN, Digipay Satu, KKP Domestik, UU HKPD (Penyaluran TKD), UU ASN 20/2023, dan PP 94/2021 Disiplin PNS.",
      durationMinutes: 45,
      thresholdPotensi: 475,
      thresholdTskkwk: 70.0,
      token: "REG2125",
      featured: false,
      questionDistribution: {
        tskkwk_perbendaharaan_modern: 18,
        tskkwk_kepegawaian: 12,
        tskkwk_tusi_kemenkeu: 10,
        tskkwk_etika_pns: 5
      }
    },
    {
      id: "tpa-potensi",
      title: "Paket Tes Potensi Akademik (TPA UPKP)",
      organizer: "Pusbin JFPM & Bimbel Giving UPKP",
      description: "Latihan intensif penalaran Potensi Akademik: Silogisme logika verbal, deret hitung bertingkat, peluang kuantitatif, dan penalaran analitis.",
      durationMinutes: 60,
      thresholdPotensi: 475,
      thresholdTskkwk: 70.0,
      token: "TPA2026",
      featured: false,
      questionDistribution: {
        potensi_verbal: 15,
        potensi_numerik: 25,
        potensi_figural_analitikal: 12
      }
    },
    {
      id: "dummy-kilat",
      title: "Ujian Dummy / Simulasi Cepat (Pemanasan)",
      organizer: "Kemenkeu Corporate University",
      description: "Simulasi kilat 15 soal untuk menguji perangkat, menguji menu navigasi KLC-CAT, dan pemanasan cepat sebelum ujian utama.",
      durationMinutes: 15,
      thresholdPotensi: 450,
      thresholdTskkwk: 70.0,
      token: "DUMMY26",
      featured: false,
      questionDistribution: {
        potensi_verbal: 3,
        potensi_numerik: 3,
        potensi_figural_analitikal: 2,
        tskkwk_perbendaharaan_modern: 3,
        tskkwk_tusi_kemenkeu: 2,
        tskkwk_nilai_kemenkeu: 2
      }
    }
  ],

  // State Ujian
  activeExam: null,
  questions: [],
  userAnswers: {},     // { qIndex: 'A' }
  markedQuestions: {}, // { qIndex: true }
  currentIndex: 0,
  timerInterval: null,
  remainingSeconds: 0,
  autosaveInterval: null,

  // Pilih soal dari Bank Soal sesuai distribusi paket
  assembleQuestions(examPackage) {
    const rawBank = window.UPKP_QUESTIONS || window.TOBAT_QUESTIONS || [];
    if (!rawBank.length) return [];

    const grouped = {};
    rawBank.forEach(q => {
      const cat = q.category || 'general';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(q);
    });

    let selectedQuestions = [];
    const dist = examPackage.questionDistribution;

    for (const cat in dist) {
      const countNeeded = dist[cat];
      const pool = grouped[cat] || [];
      // Shuffle pool
      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      const picked = shuffled.slice(0, countNeeded);
      selectedQuestions.push(...picked);
    }

    // Jika belum cukup karena distribusi lebih kecil dari bank, tambahkan dari kategori lain
    if (selectedQuestions.length === 0) {
      selectedQuestions = [...rawBank].sort(() => 0.5 - Math.random()).slice(0, 30);
    } else {
      // Shuffle urutan keseluruhan soal
      selectedQuestions = selectedQuestions.sort(() => 0.5 - Math.random());
    }

    return selectedQuestions;
  },

  // Inisialisasi Ujian Baru
  startExam(packageId) {
    const pkg = this.EXAM_PACKAGES.find(p => p.id === packageId) || this.EXAM_PACKAGES[0];
    this.activeExam = pkg;
    this.questions = this.assembleQuestions(pkg);
    this.userAnswers = {};
    this.markedQuestions = {};
    this.currentIndex = 0;
    this.remainingSeconds = pkg.durationMinutes * 60;

    // Simpan ke storage untuk autosave
    this.saveStateToStorage();

    return {
      package: pkg,
      totalQuestions: this.questions.length,
      durationMinutes: pkg.durationMinutes
    };
  },

  // Simpan status pengerjaan ke localStorage
  saveStateToStorage() {
    try {
      const state = {
        examId: this.activeExam ? this.activeExam.id : null,
        userAnswers: this.userAnswers,
        markedQuestions: this.markedQuestions,
        currentIndex: this.currentIndex,
        remainingSeconds: this.remainingSeconds,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem('TOBAT_EXAM_STATE', JSON.stringify(state));
    } catch (e) {
      // Silent error for storage limit
    }
  },

  // Jawab Soal
  answerQuestion(index, letter) {
    this.userAnswers[index] = letter;
    this.saveStateToStorage();
  },

  // Tandai / Batalkan Ragu-ragu
  toggleMark(index) {
    if (this.markedQuestions[index]) {
      delete this.markedQuestions[index];
    } else {
      this.markedQuestions[index] = true;
    }
    this.saveStateToStorage();
    return !!this.markedQuestions[index];
  },

  // Dapatkan Soal Saat Ini
  getCurrentQuestion() {
    if (!this.questions.length || this.currentIndex >= this.questions.length) {
      return null;
    }
    const q = this.questions[this.currentIndex];
    return {
      index: this.currentIndex,
      total: this.questions.length,
      data: q,
      selectedAnswer: this.userAnswers[this.currentIndex] || null,
      isMarked: !!this.markedQuestions[this.currentIndex]
    };
  },

  // Hitung Skor & Hasil Evaluasi Akhir
  calculateResults() {
    let totalCorrect = 0;
    let totalWrong = 0;
    let totalUnanswered = 0;

    let potensiCorrect = 0;
    let potensiTotal = 0;

    let tskkwkCorrect = 0;
    let tskkwkTotal = 0;

    const reviewList = [];

    this.questions.forEach((q, idx) => {
      const userAns = this.userAnswers[idx] || null;
      const correctAns = (q.answer || '').toUpperCase().trim();
      const isPotensi = q.category.startsWith('potensi_');

      if (isPotensi) potensiTotal++;
      else tskkwkTotal++;

      let isCorrect = false;
      if (userAns) {
        if (userAns.toUpperCase() === correctAns) {
          isCorrect = true;
          totalCorrect++;
          if (isPotensi) potensiCorrect++;
          else tskkwkCorrect++;
        } else {
          totalWrong++;
        }
      } else {
        totalUnanswered++;
      }

      reviewList.push({
        number: idx + 1,
        question: q.question,
        options: q.options,
        userAnswer: userAns,
        correctAnswer: correctAns,
        isCorrect: isCorrect,
        isMarked: !!this.markedQuestions[idx],
        categoryName: q.categoryName,
        explanation: q.explanation || `Kunci jawaban yang benar adalah ${correctAns}.`
      });
    });

    // Perhitungan Nilai Skala UPKP Resmi
    // 1. Tes Potensi: Skala 200 - 800 (atau skala UPKP 100-500). Standar UPKP Bappenas:
    let scorePotensi = 0;
    if (potensiTotal > 0) {
      scorePotensi = Math.round((potensiCorrect / potensiTotal) * 400 + 200);
    } else {
      scorePotensi = 500; // default jika paket non-potensi
    }

    // 2. TSKKWK: Skala 0 - 100
    let scoreTskkwk = 0;
    if (tskkwkTotal > 0) {
      scoreTskkwk = parseFloat(((tskkwkCorrect / tskkwkTotal) * 100).toFixed(1));
    } else {
      scoreTskkwk = 85.0; // default jika paket murni TPA
    }

    const pkg = this.activeExam || this.EXAM_PACKAGES[0];
    const passPotensi = scorePotensi >= pkg.thresholdPotensi;
    const passTskkwk = scoreTskkwk >= pkg.thresholdTskkwk;
    const isLulus = passPotensi && passTskkwk;

    const accuracy = this.questions.length > 0 
      ? Math.round((totalCorrect / this.questions.length) * 100) 
      : 0;

    // Catatan dan Rekomendasi Evaluasi Kelulusan Resmi
    let loveMessage = "";
    if (isLulus) {
      loveMessage = "Selamat! Anda dinyatakan MEMENUHI AMBANG BATAS KELULUSAN (PASSING GRADE) pada simulasi Ujian Penyesuaian Kenaikan Pangkat (UPKP) Kementerian Keuangan. Hasil ini menunjukkan kesiapan kompetensi Anda dalam menghadapi ujian dinas yang sesungguhnya. Pertahankan penguasaan materi perbendaharaan, tata kelola keuangan negara, dan wawasan kebangsaan.";
    } else {
      loveMessage = "Anda dinyatakan BELUM MEMENUHI AMBANG BATAS KELULUSAN (PASSING GRADE) pada simulasi ini. Nilai Anda belum melampaui standar kelulusan minimum yang dipersyaratkan oleh Biro SDM. Disarankan untuk mempelajari kembali regulasi terbaru perbendaharaan (UU HKPD, UU ASN 20/2023, PP 94/2021, SAKTI) serta mencermati lembar pembahasan soal di bawah ini.";
    }

    return {
      stats: {
        scorePotensi,
        scoreTskkwk,
        passPotensi,
        passTskkwk,
        isLulus,
        totalQuestions: this.questions.length,
        correctCount: totalCorrect,
        wrongCount: totalWrong,
        unansweredCount: totalUnanswered,
        accuracy,
        loveMessage
      },
      reviewList
    };
  }
};

window.ExamEngine = ExamEngine;
