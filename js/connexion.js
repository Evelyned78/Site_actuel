document.addEventListener('DOMContentLoaded', () => {
    /*--View switching--*/

    const views = { 
        login:      document.getElementById('loginView'),
        register:   document.getElementById('registerView'),
        forgot:     document.getElementById('forgotView'),
        success:    document.getElementById('successView'),  
    };

    function showView(name) {
        Object.values(views).forEach(v => v.classList.add('hidden'));
        const v = views[name];
        v.classList.remove('hidden');
        // re-trigger animation
        // v.style.animation  = 'none';
        void v.offsetWidth;
        v.style.animation = '';

        document.getElementById('showRegister')?.addEventListener('click', () => showView('register'));
        document.getElementById('showLogin')?.addEventListener('click', () => showView('login'));
        document.getElementById('forgotLink')?.addEventListener('click', e  => { e.preventDefault(); showView('forgot'); });
        document.getElementById('backToLogin')?.addEventListener('click', () => showView('login'));

    /*--Helpers--*/

        function setError(inputId, errId,msg) {
        const input = document.getElementById(inputId);
        const err   = document.getElementById(errId);
        if (!input || !err) return;
        input.classList.toggle('error', !!msg);
        input.classList.toggle('valid', !!msg);
        err.textContent = msg || '';
    
  }
        function validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    /* --Password show/hide toggles--*/
        document.querySelectorAll('.toggle-pwd').forEach(btn => {
        btn.addEventListener('click',() => { 
        const input = document.getElementById(btn.dataset.target);
        if(!input) return;
        input.type = input.type === 'password' ? 'text' : 'password';


        });
    });

    


  

  /* ── Password show/hide toggles ── */
  document.querySelectorAll('.toggle-pwd').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.target);
      if (!input) return;
      input.type = input.type === 'password' ? 'text' : 'password';
    });
  });

  /* ── Password strength meter ── */
  const regPwd     = document.getElementById('regPwd');
  const strengthBar = document.querySelector('.pwd-strength span');

  regPwd?.addEventListener('input', () => {
    const val = regPwd.value;
    let score = 0;
    if (val.length >= 8)           score++;
    if (/[A-Z]/.test(val))         score++;
    if (/[0-9]/.test(val))         score++;
    if (/[^A-Za-z0-9]/.test(val))  score++;

    const colors = ['', '#C0392B', '#E67E22', '#F1C40F', '#4A6741'];
    const widths = ['0%', '25%', '50%', '75%', '100%'];
    if (strengthBar) {
      strengthBar.style.width      = widths[score];
      strengthBar.style.background = colors[score];
    }
  });

  /* ── LOGIN FORM ── */
  document.getElementById('loginForm')?.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    const email = document.getElementById('loginEmail').value.trim();
    const pwd   = document.getElementById('loginPwd').value;

    if (!validateEmail(email)) { setError('loginEmail', 'loginEmailErr', 'Adresse email invalide.'); valid = false; }
    else                        { setError('loginEmail', 'loginEmailErr', ''); }

    if (pwd.length < 6) { setError('loginPwd', 'loginPwdErr', 'Mot de passe trop court.'); valid = false; }
    else                 { setError('loginPwd', 'loginPwdErr', ''); }

    if (!valid) return;

    const btn = e.target.querySelector('.btn-submit');
    btn.textContent = 'Connexion…';
    btn.disabled = true;

    setTimeout(() => {
      document.getElementById('successTitle').textContent = 'Bienvenue !';
      document.getElementById('successMsg').textContent   = 'Vous êtes connecté(e) à votre espace Bhibelya.';
      showView('success');
    }, 1200);
  });

  /* ── REGISTER FORM ── */
  document.getElementById('registerForm')?.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    const email = document.getElementById('regEmail').value.trim();
    const pwd   = document.getElementById('regPwd').value;
    const pwd2  = document.getElementById('regPwd2').value;

    if (!validateEmail(email)) { setError('regEmail', 'regEmailErr', 'Adresse email invalide.'); valid = false; }
    else                        { setError('regEmail', 'regEmailErr', ''); }

    if (pwd.length < 8) { setError('regPwd', 'regPwdErr', 'Minimum 8 caractères.'); valid = false; }
    else                  { setError('regPwd', 'regPwdErr', ''); }

    if (pwd !== pwd2) { setError('regPwd2', 'regPwd2Err', 'Les mots de passe ne correspondent pas.'); valid = false; }
    else               { setError('regPwd2', 'regPwd2Err', ''); }

    if (!valid) return;

    const btn = e.target.querySelector('.btn-submit');
    btn.textContent = 'Création…';
    btn.disabled = true;

    setTimeout(() => {
      document.getElementById('successTitle').textContent = 'Compte créé !';
      document.getElementById('successMsg').textContent   = 'Votre compte Bhibelya a été créé avec succès.';
      showView('success');
    }, 1200);
  });

  /* ── FORGOT FORM ── */
  document.getElementById('forgotForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('forgotEmail').value.trim();
    if (!validateEmail(email)) {
      setError('forgotEmail', 'forgotEmailErr', 'Adresse email invalide.');
      return;
    }
    setError('forgotEmail', 'forgotEmailErr', '');

    const btn = e.target.querySelector('.btn-submit');
    btn.textContent = 'Envoi…';
    btn.disabled = true;

    setTimeout(() => {
      document.getElementById('successTitle').textContent = 'Email envoyé !';
      document.getElementById('successMsg').textContent   = `Un lien de réinitialisation a été envoyé à ${email}`;
      showView('success');
    }, 1200);
  });

  /* ── Live validation on blur ── */
  document.getElementById('loginEmail')?.addEventListener('blur', function () {
    if (this.value && !validateEmail(this.value)) setError('loginEmail', 'loginEmailErr', 'Adresse email invalide.');
    else setError('loginEmail', 'loginEmailErr', '');
  });

  document.getElementById('regEmail')?.addEventListener('blur', function () {
    if (this.value && !validateEmail(this.value)) setError('regEmail', 'regEmailErr', 'Adresse email invalide.');
    else setError('regEmail', 'regEmailErr', '');
  });

});
