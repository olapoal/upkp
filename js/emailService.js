/**
 * emailService.js
 * Modul Pengiriman Hasil Ujian UPKP ke Email Peserta & Generator Rapor Resmi
 */

const EmailService = {
  // Format HTML & Plaintext Rapor Resmi Kemenkeu
  generateReport(resultData) {
    const { user, exam, stats, reviewList } = resultData;
    const isLulus = stats.isLulus;
    const statusText = isLulus ? "MEMENUHI AMBANG BATAS KELULUSAN (LULUS)" : "BELUM MEMENUHI AMBANG BATAS KELULUSAN";

    let wrongQuestionsText = "";
    const wrongItems = reviewList.filter(item => !item.isCorrect);

    if (wrongItems.length > 0) {
      wrongQuestionsText = "\n\n=======================================================\n";
      wrongQuestionsText += "DAFTAR SOAL YANG BELUM TEPAT DAN PEMBAHASAN RESMI:\n";
      wrongQuestionsText += "=======================================================\n";
      wrongItems.forEach((item, idx) => {
        wrongQuestionsText += `\n[${idx + 1}] Soal: ${item.question}\n`;
        wrongQuestionsText += `    - Jawaban Peserta: ${item.userAnswer || '(Tidak dijawab)'}\n`;
        wrongQuestionsText += `    - Kunci Benar    : ${item.correctAnswer}\n`;
        wrongQuestionsText += `    - Pembahasan     : ${item.explanation}\n`;
      });
    }

    const plainText = `
KEMENTERIAN KEUANGAN REPUBLIK INDONESIA
DIREKTORAT JENDERAL PERBENDAHARAAN (DJPb)
BADAN PENDIDIKAN DAN PELATIHAN KEUANGAN (BPPK)
COMPUTER ASSISTED TEST (KLC-CAT) 2026
-------------------------------------------------------
LAPORAN HASIL EVALUASI SIMULASI UPKP TAHUN 2026
Sistem: Computer Assisted Test (KLC-CAT)
-------------------------------------------------------

DATA PESERTA:
- Nama Lengkap : ${user.nama}
- NIP          : ${user.nip}
- Unit Kerja   : ${user.unit}
- Email Tujuan : ${user.email}
- Paket Ujian  : ${exam.title}
- Waktu Ujian  : ${new Date().toLocaleString('id-ID')}

HASIL PENILAIAN AMBANG BATAS (PASSING GRADE):
- Nilai Tes Potensi : ${stats.scorePotensi} (Passing Grade: ${exam.thresholdPotensi}) -> ${stats.passPotensi ? 'MEMENUHI' : 'BELUM'}
- Nilai TSKKWK      : ${stats.scoreTskkwk} (Passing Grade: ${exam.thresholdTskkwk}) -> ${stats.passTskkwk ? 'MEMENUHI' : 'BELUM'}
- Total Jawaban     : ${stats.totalQuestions} Soal
- Benar             : ${stats.correctCount} Soal
- Salah             : ${stats.wrongCount} Soal
- Kosong            : ${stats.unansweredCount} Soal
- Akurasi           : ${stats.accuracy}%

STATUS KELULUSAN:
>>> ${statusText} <<<

CATATAN EVALUASI PENGAWAS UJIAN:
"${stats.loveMessage}"
${wrongQuestionsText}

-------------------------------------------------------
Dokumen ini dihasilkan secara otomatis oleh Sistem Simulasi KLC-CAT UPKP 2026.
Biro SDM Sekretariat Jenderal Kementerian Keuangan Republik Indonesia.
`.trim();

    return {
      plainText,
      subject: `[RAPOR RESMI UPKP 2026] Hasil Simulasi ${exam.title} - ${user.nama}`
    };
  },

  // Kirim email via Mailto Client (100% Reliable & Zero Dependency)
  sendViaMailto(recipientEmail, subject, bodyText) {
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(bodyText);
    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodedSubject}&body=${encodedBody}`;
    
    // Buka client email
    const win = window.open(mailtoUrl, '_blank');
    if (!win) {
      window.location.href = mailtoUrl;
    }
  },

  // Kirim email otomatis via Web Service API / EmailJS / Formspree
  async sendViaWebApi(recipientEmail, resultData) {
    const report = this.generateReport(resultData);

    // Kirim via Email API endpoint jika tersedia
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: recipientEmail,
          subject: report.subject,
          text: report.plainText,
          result: resultData
        })
      });

      if (response.ok) {
        return { success: true, method: 'api' };
      }
    } catch (e) {
      // Backend lokal tidak aktif, fallback otomatis ke Webhook / Mailto
    }

    // Fallback: Mailto client
    this.sendViaMailto(recipientEmail, report.subject, report.plainText);
    return { success: true, method: 'mailto' };
  }
};

window.EmailService = EmailService;
