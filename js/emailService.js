/**
 * emailService.js
 * Modul Pengiriman Hasil Ujian UPKP ke Email Peserta & Generator Rapor Resmi
 */

const EmailService = {
  // Format HTML & Plaintext Rapor Lengkap Resmi Kemenkeu (Full Version dengan 200 Pembahasan)
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
        wrongQuestionsText += `\n[${idx + 1}] Soal #${item.number} (${item.categoryName || 'Materi UPKP'}):\n`;
        wrongQuestionsText += `    Soal            : ${item.question}\n`;
        wrongQuestionsText += `    Jawaban Peserta : ${item.userAnswer || '(Tidak dijawab)'}\n`;
        wrongQuestionsText += `    Kunci Resmi     : ${item.correctAnswer}\n`;
        wrongQuestionsText += `    Pembahasan      : ${item.explanation}\n`;
      });
    }

    let scoreLines = "";
    if (stats.potensiTotal > 0) {
      scoreLines += `- Nilai Tes Potensi : ${stats.scorePotensi} (Passing Grade: >= ${exam.thresholdPotensi || 475}) -> ${stats.passPotensi ? 'MEMENUHI' : 'BELUM'}\n`;
    }
    if (stats.tskkwkTotal > 0) {
      scoreLines += `- Nilai TSKKWK      : ${stats.scoreTskkwk} (Passing Grade: >= ${exam.thresholdTskkwk || 70.0}) -> ${stats.passTskkwk ? 'MEMENUHI' : 'BELUM'}\n`;
    }
    if (stats.psikologiTotal > 0) {
      scoreLines += `- Nilai Tes Psikologi: ${stats.scorePsikologi} (Passing Grade: >= ${exam.thresholdPsikologi || 70.0}) -> ${stats.passPsikologi ? 'MEMENUHI' : 'BELUM'}\n`;
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
${scoreLines.trim()}
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

  // Format Ringkas Khusus URL & Mailto (< 1.200 Karakter agar TIDAK terpotong OS / Browser)
  generateSummaryText(resultData) {
    const { user, exam, stats } = resultData;
    const isLulus = stats.isLulus;
    const statusText = isLulus ? "MEMENUHI AMBANG BATAS KELULUSAN (LULUS)" : "BELUM MEMENUHI AMBANG BATAS KELULUSAN";

    let scoreLines = "";
    if (stats.potensiTotal > 0) {
      scoreLines += `- Nilai Tes Potensi : ${stats.scorePotensi} (Min: >= ${exam.thresholdPotensi || 475})\n`;
    }
    if (stats.tskkwkTotal > 0) {
      scoreLines += `- Nilai TSKKWK      : ${stats.scoreTskkwk} (Min: >= ${exam.thresholdTskkwk || 70.0})\n`;
    }
    if (stats.psikologiTotal > 0) {
      scoreLines += `- Nilai Psikologi   : ${stats.scorePsikologi} (Min: >= ${exam.thresholdPsikologi || 70.0})\n`;
    }

    return `KEMENTERIAN KEUANGAN RI - DITJEN PERBENDAHARAAN
SIMULASI COMPUTER ASSISTED TEST (KLC-CAT) UPKP 2026
-------------------------------------------------------
DATA PESERTA:
Nama  : ${user.nama}
NIP   : ${user.nip}
Unit  : ${user.unit}
Paket : ${exam.title}
Waktu : ${new Date().toLocaleString('id-ID')}

NILAI KELULUSAN (PASSING GRADE):
${scoreLines.trim()}

RINGKASAN HASIL:
Benar: ${stats.correctCount} | Salah: ${stats.wrongCount} | Kosong: ${stats.unansweredCount} (Total: ${stats.totalQuestions} Soal, Akurasi: ${stats.accuracy}%)

STATUS KELULUSAN:
>>> ${statusText} <<<

(Catatan: Lembar pembahasan lengkap seluruh butir soal dapat disalin atau diunduh langsung melalui aplikasi KLC-CAT UPKP).
-------------------------------------------------------
Biro SDM Setjen Kemenkeu RI & Ditjen Perbendaharaan`.trim();
  },

  // 1. Kirim via Mailto (Aplikasi Email Desktop Windows Mail/Outlook) - Dijamin aman dari limit 2048 karakter
  sendViaMailto(recipientEmail, resultData) {
    const report = this.generateReport(resultData);
    const summaryText = this.generateSummaryText(resultData);
    const encodedSubject = encodeURIComponent(report.subject);
    const encodedBody = encodeURIComponent(summaryText);
    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodedSubject}&body=${encodedBody}`;

    const a = document.createElement('a');
    a.href = mailtoUrl;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      if (document.body.contains(a)) document.body.removeChild(a);
    }, 1000);
    return true;
  },

  // 2. Buka langsung di Gmail Web (Langsung buka tab baru dengan draf lengkap)
  openGmailWeb(recipientEmail, resultData) {
    const report = this.generateReport(resultData);
    const summaryText = this.generateSummaryText(resultData);
    const encodedSubject = encodeURIComponent(report.subject);
    const encodedBody = encodeURIComponent(summaryText);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipientEmail)}&su=${encodedSubject}&body=${encodedBody}`;
    window.open(gmailUrl, '_blank');
    return true;
  },

  // 3. Salin Seluruh Isi Rapor ke Clipboard (100% Full Version + 200 Pembahasan)
  async copyReportToClipboard(resultData) {
    const report = this.generateReport(resultData);
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(report.plainText);
        return true;
      }
    } catch (e) {
      // Fallback below
    }

    const ta = document.createElement('textarea');
    ta.value = report.plainText;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const success = document.execCommand('copy');
    document.body.removeChild(ta);
    return success;
  },

  // 4. Unduh Berkas Teks Rapor Lengkap (.txt)
  downloadReportTxt(resultData) {
    const report = this.generateReport(resultData);
    const { user } = resultData;
    const safeName = (user.nama || 'Peserta').replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `Rapor_UPKP_2026_${safeName}.txt`;

    const blob = new Blob([report.plainText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 1000);
    return true;
  },

  // 5. Kirim via Web Backend API (jika server lokal port 8080 aktif)
  async sendViaWebApi(recipientEmail, resultData) {
    const report = this.generateReport(resultData);

    const endpoints = [
      '/api/send-email',
      'http://localhost:8080/api/send-email'
    ];

    for (const url of endpoints) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: recipientEmail,
            subject: report.subject,
            text: report.plainText,
            summary: this.generateSummaryText(resultData),
            result: resultData
          })
        });

        if (response.ok) {
          return { success: true, method: 'local-api' };
        }
      } catch (e) {
        // Try next endpoint
      }
    }

    return { success: false, method: 'none' };
  }
};

window.EmailService = EmailService;
