// src/app/receipt/page.jsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';

export default function ReceiptPage() {
  const { lang } = useLang();

  // Form state
  const [form, setForm] = useState({
    memberName: 'श्री राम कुमार कलार',
    memberId: 'CKM-G-2026-123456',
    fatherName: 'श्री मोहन कलार',
    phone: '+91 98260 50235',
    email: 'ram@example.com',
    address: '12 स्टेशन रोड, रायपुर, छत्तीसगढ़ - 492001',
    tier: 'general',
    period: '2026',
    amount: '5000',
    paymentMode: 'upi',
    transactionId: 'TXN' + Date.now().toString().slice(-8),
    remarks: 'वार्षिक सदस्यता शुल्क 2026',
  });

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  // Receipt metadata
  const receiptNumber = useMemo(
    () => `CKM/RCP/${new Date().getFullYear()}/${Math.floor(100000 + Math.random() * 900000)}`,
    []
  );

  const today = new Date().toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const amountWords = numberToWords(Number(form.amount) || 0);

  const tierLabel = {
    active: lang === 'hi' ? 'सक्रिय सदस्य' : 'Active Member',
    general: lang === 'hi' ? 'साधारण सदस्य' : 'General Member',
    patron: lang === 'hi' ? 'संरक्षक सदस्य' : 'Patron Member',
  }[form.tier];

  const paymentLabel = {
    upi: 'UPI',
    cash: lang === 'hi' ? 'नकद' : 'Cash',
    cheque: lang === 'hi' ? 'चेक' : 'Cheque',
    bank: lang === 'hi' ? 'बैंक ट्रांसफर' : 'Bank Transfer',
    online: lang === 'hi' ? 'ऑनलाइन' : 'Online',
  }[form.paymentMode];

  return (
    <main className="ckm-receipt-page">

      {/* Controls (hidden in print) */}
      <section className="ckm-receipt-controls no-print">
        <div className="ckm-container">
          <div className="ckm-receipt-controls-head">
            <div>
              <h1>{lang === 'hi' ? 'शुल्क रसीद जनरेटर' : 'Fee Receipt Generator'}</h1>
              <p>
                {lang === 'hi'
                  ? 'नीचे दी गई जानकारी भरें - रसीद अपने आप तैयार हो जाएगी।'
                  : 'Fill the details below - the receipt updates live.'}
              </p>
            </div>
            <Link href="/" className="ckm-receipt-back">
              <i className="fa-solid fa-arrow-left" />
              {lang === 'hi' ? 'होम' : 'Home'}
            </Link>
          </div>

          <div className="ckm-receipt-form">
            <div className="ckm-field">
              <label>{lang === 'hi' ? 'सदस्य का नाम' : 'Member Name'}</label>
              <input value={form.memberName} onChange={(e) => set('memberName', e.target.value)} />
            </div>

            <div className="ckm-field">
              <label>{lang === 'hi' ? 'सदस्यता संख्या' : 'Member ID'}</label>
              <input value={form.memberId} onChange={(e) => set('memberId', e.target.value)} />
            </div>

            <div className="ckm-field">
              <label>{lang === 'hi' ? 'पिता का नाम' : "Father's Name"}</label>
              <input value={form.fatherName} onChange={(e) => set('fatherName', e.target.value)} />
            </div>

            <div className="ckm-field">
              <label>{lang === 'hi' ? 'मोबाइल' : 'Mobile'}</label>
              <input value={form.phone} onChange={(e) => set('phone', e.target.value)} />
            </div>

            <div className="ckm-field">
              <label>{lang === 'hi' ? 'ईमेल' : 'Email'}</label>
              <input value={form.email} onChange={(e) => set('email', e.target.value)} />
            </div>

            <div className="ckm-field ckm-full">
              <label>{lang === 'hi' ? 'पता' : 'Address'}</label>
              <input value={form.address} onChange={(e) => set('address', e.target.value)} />
            </div>

            <div className="ckm-field">
              <label>{lang === 'hi' ? 'सदस्यता श्रेणी' : 'Membership Tier'}</label>
              <select value={form.tier} onChange={(e) => set('tier', e.target.value)}>
                <option value="active">{lang === 'hi' ? 'सक्रिय सदस्य' : 'Active Member'}</option>
                <option value="general">{lang === 'hi' ? 'साधारण सदस्य' : 'General Member'}</option>
                <option value="patron">{lang === 'hi' ? 'संरक्षक सदस्य' : 'Patron Member'}</option>
              </select>
            </div>

            <div className="ckm-field">
              <label>{lang === 'hi' ? 'अवधि' : 'Period'}</label>
              <input value={form.period} onChange={(e) => set('period', e.target.value)} />
            </div>

            <div className="ckm-field">
              <label>{lang === 'hi' ? 'राशि (₹)' : 'Amount (₹)'}</label>
              <input
                type="number"
                value={form.amount}
                onChange={(e) => set('amount', e.target.value)}
              />
            </div>

            <div className="ckm-field">
              <label>{lang === 'hi' ? 'भुगतान विधि' : 'Payment Mode'}</label>
              <select value={form.paymentMode} onChange={(e) => set('paymentMode', e.target.value)}>
                <option value="upi">UPI</option>
                <option value="cash">{lang === 'hi' ? 'नकद' : 'Cash'}</option>
                <option value="cheque">{lang === 'hi' ? 'चेक' : 'Cheque'}</option>
                <option value="bank">{lang === 'hi' ? 'बैंक ट्रांसफर' : 'Bank Transfer'}</option>
                <option value="online">{lang === 'hi' ? 'ऑनलाइन' : 'Online'}</option>
              </select>
            </div>

            <div className="ckm-field">
              <label>{lang === 'hi' ? 'लेनदेन संख्या' : 'Transaction ID'}</label>
              <input value={form.transactionId} onChange={(e) => set('transactionId', e.target.value)} />
            </div>

            <div className="ckm-field ckm-full">
              <label>{lang === 'hi' ? 'टिप्पणी' : 'Remarks'}</label>
              <input value={form.remarks} onChange={(e) => set('remarks', e.target.value)} />
            </div>
          </div>

          <div className="ckm-receipt-actions">
            <button onClick={() => window.print()} className="ckm-cta-btn-gold-lg">
              <i className="fa-solid fa-print" />
              {lang === 'hi' ? 'प्रिंट / PDF' : 'Print / PDF'}
            </button>
          </div>
        </div>
      </section>

      {/* RECEIPT (visible when printing) */}
      <section className="ckm-receipt-print">
        <div className="ckm-receipt">

          {/* Watermark */}
          <div className="ckm-receipt-watermark">
            {lang === 'hi' ? 'भुगतान प्राप्त' : 'PAID'}
          </div>

          {/* Header */}
          <header className="ckm-receipt-header">
            <div className="ckm-receipt-logo">
              <img src="/images/ckm-logo.png" alt="Logo" />
            </div>
            <div className="ckm-receipt-title">
              <h1>{lang === 'hi' ? 'छत्तीसगढ़ कलार महासंघ' : 'Chhattisgarh Kalar Mahasangh'}</h1>
              <p className="ckm-receipt-sub">
                {lang === 'hi' ? 'सदस्यता शुल्क रसीद' : 'Membership Fee Receipt'}
              </p>
              <p className="ckm-receipt-addr">
                कलार भवन, स्टेशन रोड, रायपुर, छत्तीसगढ़ - 492001
                <br />
                <span>📞 +91 98260 50235 · ✉️ cgkalarmahasangh@gmail.com</span>
              </p>
            </div>
            <div className="ckm-receipt-qr">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(
                  `Receipt:${receiptNumber}|Member:${form.memberId}|Amount:${form.amount}`
                )}`}
                alt="QR Code"
              />
              <small>Scan to verify</small>
            </div>
          </header>

          {/* Meta row */}
          <div className="ckm-receipt-meta">
            <div>
              <span>{lang === 'hi' ? 'रसीद संख्या' : 'Receipt No.'}</span>
              <strong>{receiptNumber}</strong>
            </div>
            <div>
              <span>{lang === 'hi' ? 'दिनांक' : 'Date'}</span>
              <strong>{today}</strong>
            </div>
          </div>

          {/* Member details */}
          <div className="ckm-receipt-section">
            <h3>{lang === 'hi' ? 'सदस्य विवरण' : 'Member Details'}</h3>
            <div className="ckm-receipt-grid">
              <div><span>{lang === 'hi' ? 'नाम' : 'Name'}</span><strong>{form.memberName}</strong></div>
              <div><span>{lang === 'hi' ? 'सदस्यता संख्या' : 'Member ID'}</span><strong>{form.memberId}</strong></div>
              <div><span>{lang === 'hi' ? 'पिता का नाम' : "Father's Name"}</span><strong>{form.fatherName}</strong></div>
              <div><span>{lang === 'hi' ? 'मोबाइल' : 'Mobile'}</span><strong>{form.phone}</strong></div>
              <div><span>{lang === 'hi' ? 'ईमेल' : 'Email'}</span><strong>{form.email}</strong></div>
              <div><span>{lang === 'hi' ? 'श्रेणी' : 'Tier'}</span><strong>{tierLabel}</strong></div>
              <div className="ckm-full">
                <span>{lang === 'hi' ? 'पता' : 'Address'}</span>
                <strong>{form.address}</strong>
              </div>
            </div>
          </div>

          {/* Payment details */}
          <div className="ckm-receipt-section">
            <h3>{lang === 'hi' ? 'भुगतान विवरण' : 'Payment Details'}</h3>
            <table className="ckm-receipt-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{lang === 'hi' ? 'विवरण' : 'Description'}</th>
                  <th>{lang === 'hi' ? 'अवधि' : 'Period'}</th>
                  <th>{lang === 'hi' ? 'राशि (₹)' : 'Amount (₹)'}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>{form.remarks}</td>
                  <td>{form.period}</td>
                  <td>{Number(form.amount).toLocaleString('en-IN')}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" style={{ textAlign: 'right' }}>
                    {lang === 'hi' ? 'कुल राशि' : 'Total'}
                  </td>
                  <td className="ckm-receipt-total">
                    ₹ {Number(form.amount).toLocaleString('en-IN')}
                  </td>
                </tr>
              </tfoot>
            </table>

            <p className="ckm-receipt-words">
              <strong>{lang === 'hi' ? 'शब्दों में:' : 'In words:'}</strong> {amountWords} Only
            </p>

            <div className="ckm-receipt-payinfo">
              <div>
                <span>{lang === 'hi' ? 'भुगतान विधि' : 'Payment Mode'}</span>
                <strong>{paymentLabel}</strong>
              </div>
              <div>
                <span>{lang === 'hi' ? 'लेनदेन संख्या' : 'Transaction ID'}</span>
                <strong>{form.transactionId}</strong>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="ckm-receipt-footer">
            <div className="ckm-receipt-note">
              <p>
                <strong>{lang === 'hi' ? 'नोट:' : 'Note:'}</strong>{' '}
                {lang === 'hi'
                  ? 'यह कंप्यूटर जनित रसीद है। कृपया इसे सुरक्षित रखें।'
                  : 'This is a computer-generated receipt. Please retain it for your records.'}
              </p>
              <p>
                {lang === 'hi'
                  ? 'इस रसीद को पाने के 7 दिनों के भीतर कोई भी शिकायत कार्यालय में दर्ज करें।'
                  : 'Any discrepancy must be reported to the office within 7 days of receipt.'}
              </p>
            </div>

            <div className="ckm-receipt-sign">
              <div className="ckm-sign-line"></div>
              <span>
                {lang === 'hi' ? 'अधिकृत हस्ताक्षर' : 'Authorized Signatory'}
              </span>
              <small>छत्तीसगढ़ कलार महासंघ</small>
            </div>
          </footer>

          {/* Bottom strip */}
          <div className="ckm-receipt-strip">
            {lang === 'hi'
              ? 'यह रसीद डिजिटल रूप से जनरेट की गई है और इसे ऑनलाइन सत्यापित किया जा सकता है।'
              : 'This receipt is digitally generated and can be verified online.'}
          </div>

        </div>
      </section>
    </main>
  );
}

/* ═══════════════════════════════════════════════════════════
   Amount to Words (Indian numbering system)
   ═══════════════════════════════════════════════════════════ */
function numberToWords(num) {
  if (!num || num === 0) return 'Zero Rupees';

  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen',
    'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const two = (n) => {
    if (n < 20) return ones[n];
    return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
  };

  const three = (n) => {
    const h = Math.floor(n / 100);
    const r = n % 100;
    return (h ? ones[h] + ' Hundred' + (r ? ' ' : '') : '') + (r ? two(r) : '');
  };

  let result = '';
  const crore = Math.floor(num / 10000000);
  const lakh = Math.floor((num % 10000000) / 100000);
  const thousand = Math.floor((num % 100000) / 1000);
  const rest = num % 1000;

  if (crore) result += three(crore) + ' Crore ';
  if (lakh) result += three(lakh) + ' Lakh ';
  if (thousand) result += three(thousand) + ' Thousand ';
  if (rest) result += three(rest);

  return result.trim() + ' Rupees';
}