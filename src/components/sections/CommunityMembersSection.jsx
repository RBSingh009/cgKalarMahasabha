// src/components/sections/CommunityMembersSection.jsx
'use client';

import { useLang } from '@/context/LanguageContext';
import { members } from '@/data/members';

export default function CommunityMembersSection() {
  const { lang } = useLang();
  const isHi = lang === 'hi';

  /* Filter: only office bearers (members with a role) */
  const officeBearers = members.filter(
    (m) => m.role && m.role.trim() !== ''
  );

  return (
    <section className="ckm-members-section sec-padding">
      <div className="ckm-container">
        {/* Section heading */}
        <div className="ckm-section-head">
          <span className="ckm-head-eyebrow">
            <span className="ckm-head-line" />
            {isHi ? 'हमारे पदाधिकारी' : 'Our Office Bearers'}
          </span>
          <h2 className="ckm-head-title">
            {isHi ? 'समाज के प्रमुख सदस्य' : 'Key Members of the Community'}
          </h2>
          <p className="ckm-head-sub">
            {isHi
              ? 'समर्पित नेतृत्व जो समाज की सेवा में निरंतर कार्यरत है।'
              : 'Dedicated leadership working continuously in service of the community.'}
          </p>
        </div>

        {/* Grid of members */}
        <div className="ckm-members-grid">
          {officeBearers.map((member) => {
            const name = isHi
              ? member.nameHi || member.name || ''
              : member.nameEn || member.name || '';

            const role = isHi
              ? member.roleHi || member.role || ''
              : member.roleEn || member.role || '';

            const rawPhone = member.phone || '';
            const cleanPhone = String(rawPhone).replace(/\s/g, '');

            return (
              <article className="ckm-member-card" key={member.id}>
                <div className="ckm-member-photo">
                  <div className="ckm-member-user-icon">
                    <i className="fa-solid fa-user" />
                  </div>

                  <div className="ckm-member-overlay">
                    <div className="ckm-member-socials">
                      {member.socials?.facebook && (
                        <a href={member.socials.facebook} aria-label="Facebook">
                          <i className="fa-brands fa-facebook-f" />
                        </a>
                      )}
                      {member.socials?.twitter && (
                        <a href={member.socials.twitter} aria-label="Twitter">
                          <i className="fa-brands fa-x-twitter" />
                        </a>
                      )}
                      {member.socials?.linkedin && (
                        <a href={member.socials.linkedin} aria-label="LinkedIn">
                          <i className="fa-brands fa-linkedin-in" />
                        </a>
                      )}
                      {member.socials?.youtube && (
                        <a href={member.socials.youtube} aria-label="YouTube">
                          <i className="fa-brands fa-youtube" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="ckm-member-info">
                  {role && <span className="ckm-member-role">{role}</span>}
                  <h3 className="ckm-member-name">{name}</h3>

                  <ul className="ckm-member-details">
                    {member.district && (
                      <li>
                        <i className="fa-solid fa-location-dot" />
                        <span>{member.district}</span>
                      </li>
                    )}

                    {cleanPhone && (
                      <li>
                        <i className="fa-solid fa-phone" />
                        <a href={`tel:${cleanPhone}`}>{rawPhone}</a>
                      </li>
                    )}

                    {member.email && (
                      <li>
                        <i className="fa-solid fa-envelope" />
                        <a href={`mailto:${member.email}`}>{member.email}</a>
                      </li>
                    )}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}