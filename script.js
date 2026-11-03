// ===== 다크 모드 토글 =====
const root = document.documentElement;
document.getElementById('theme-toggle').addEventListener('click', () => {
  const isDark = root.classList.toggle('dark');
  try {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  } catch (e) {
    // 저장소를 쓸 수 없는 환경에서는 현재 세션에만 적용
  }
});

// ===== 모바일 메뉴 =====
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

function setMenuOpen(open) {
  mobileMenu.classList.toggle('hidden', !open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
}

menuToggle.addEventListener('click', () => {
  setMenuOpen(mobileMenu.classList.contains('hidden'));
});
mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenuOpen(false));
});

// ===== 스크롤 시 navbar 배경 =====
const navbar = document.getElementById('navbar');
function updateNavbar() {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
}
window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();

// ===== 섹션 등장 애니메이션 =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// ===== 현재 섹션에 맞춰 nav 링크 활성화 =====
const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);
document.querySelectorAll('main section[id]').forEach((s) => sectionObserver.observe(s));

// ===== 이메일 복사 =====
const copyBtn = document.getElementById('copy-email');
const copyLabel = copyBtn.textContent.trim();
let copyTimer;
copyBtn.addEventListener('click', async () => {
  const email = copyBtn.dataset.email;
  clearTimeout(copyTimer);
  try {
    await navigator.clipboard.writeText(email);
    copyBtn.textContent = '복사됨! ✓';
  } catch (e) {
    copyBtn.textContent = email; // 클립보드 사용 불가 시 주소를 보여줌
  }
  copyTimer = setTimeout(() => {
    copyBtn.textContent = copyLabel;
  }, 2000);
});

// ===== 푸터 연도 =====
document.getElementById('year').textContent = new Date().getFullYear();
