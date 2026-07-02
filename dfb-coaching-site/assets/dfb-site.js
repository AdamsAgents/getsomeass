(() => {
  const pathMap = {
    'in-person': 'NYC In-Person Sessions',
    online: 'Online Everfit Coaching',
    'one-time': 'One-Time Custom Program'
  };

  const pathLabels = {
    'in-person': 'NYC In-Person Coaching',
    online: 'Online Coaching',
    'one-time': 'One-Time Custom Program'
  };

  const form = document.querySelector('.questionnaire');
  if (!form) return;

  const confirmation = form.querySelector('[data-path-confirmation]');
  const confirmationLabel = form.querySelector('[data-path-label]');
  const changeButton = form.querySelector('[data-change-path]');
  const clickedPathInput = form.querySelector('input[name="Clicked Coaching Path"]');
  const programSection = form.querySelector('[data-program-section]');
  const programError = form.querySelector('[data-program-error]');
  const programRadios = Array.from(form.querySelectorAll('input[name="Coaching Interest"]'));
  const updateChoiceStates = () => {
    form.querySelectorAll('label.choice').forEach((label) => {
      const radio = label.querySelector('input[type="radio"]');
      label.classList.toggle('is-selected', Boolean(radio && radio.checked));
    });
  };


  const getSection = (field) => field.closest('.form-section') || field;
  const selectedProgram = () => programRadios.find((radio) => radio.checked);

  const clearAttention = () => {
    form.querySelectorAll('.form-section.needs-attention').forEach((section) => {
      section.classList.remove('needs-attention');
    });
  };

  const showProgramError = () => {
    if (programSection) programSection.classList.add('form-error', 'needs-attention');
    if (programError) programError.classList.add('is-visible');
  };

  const hideProgramError = () => {
    if (programSection) programSection.classList.remove('form-error');
    if (programError) programError.classList.remove('is-visible');
  };

  const scrollToProgram = () => {
    if (!programSection) return;
    programSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    window.setTimeout(() => {
      const firstRadio = programRadios[0];
      if (firstRadio && typeof firstRadio.focus === 'function') firstRadio.focus({ preventScroll: true });
    }, 450);
  };

  const setPath = (path, updateUrl = false) => {
    const value = pathMap[path];
    if (!value) return false;
    const radio = programRadios.find((item) => item.value === value);
    if (radio) radio.checked = true;
    updateChoiceStates();
    if (clickedPathInput) clickedPathInput.value = pathLabels[path] || value;
    if (confirmationLabel) confirmationLabel.textContent = pathLabels[path] || value;
    if (confirmation) confirmation.classList.add('is-visible');
    hideProgramError();
    if (updateUrl && window.history && window.location) {
      const url = new URL(window.location.href);
      url.searchParams.set('path', path);
      window.history.replaceState(null, '', url.toString());
    }
    return true;
  };

  const clearPath = () => {
    programRadios.forEach((radio) => { radio.checked = false; });
    updateChoiceStates();
    if (clickedPathInput) clickedPathInput.value = '';
    if (confirmation) confirmation.classList.remove('is-visible');
    hideProgramError();
    if (window.history && window.location) {
      const url = new URL(window.location.href);
      url.searchParams.delete('path');
      window.history.replaceState(null, '', url.toString());
    }
    scrollToProgram();
  };

  const applyPathFromUrl = () => {
    const url = new URL(window.location.href);
    const path = url.searchParams.get('path') || document.body.getAttribute('data-default-path');
    if (pathMap[path]) setPath(path, false);
  };

  if (changeButton) changeButton.addEventListener('click', clearPath);
  programRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      hideProgramError();
      updateChoiceStates();
      const matchedPath = Object.keys(pathMap).find((path) => pathMap[path] === radio.value);
      if (clickedPathInput) clickedPathInput.value = matchedPath ? (pathLabels[matchedPath] || radio.value) : radio.value;
      if (confirmation) confirmation.classList.remove('is-visible');
    });
  });

  const focusFirstInvalid = () => {
    if (!selectedProgram()) {
      clearAttention();
      showProgramError();
      scrollToProgram();
      return false;
    }
    const firstInvalid = form.querySelector(':invalid');
    if (!firstInvalid) return true;
    clearAttention();
    const section = getSection(firstInvalid);
    section.classList.add('needs-attention');
    section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    window.setTimeout(() => {
      if (typeof firstInvalid.focus === 'function') firstInvalid.focus({ preventScroll: true });
    }, 450);
    return false;
  };

  form.addEventListener('submit', (event) => {
    if (!selectedProgram() || !form.checkValidity()) {
      event.preventDefault();
      focusFirstInvalid();
    }
  });
  form.addEventListener('invalid', (event) => {
    event.preventDefault();
    focusFirstInvalid();
  }, true);
  form.addEventListener('input', clearAttention);
  form.addEventListener('change', clearAttention);
  window.addEventListener('popstate', applyPathFromUrl);
  updateChoiceStates();
  applyPathFromUrl();
})();
