// Toggle Dark Mode Function
function toggleDarkMode() {
  var body = document.body;
  body.classList.toggle('dark-mode');
  var navbar = document.querySelector('.navbar');
  navbar.classList.toggle('dark-mode');
  var icon = document.querySelector('#theme-toggle i');
  var text = document.querySelector('#theme-toggle span');
  var toggleButton = document.querySelector('#theme-toggle');
  
  if (body.classList.contains('dark-mode')) {
    icon.className = 'fa fa-sun';
    text.textContent = '';
    toggleButton.title = "Switch to Light Mode";
  } else {
    icon.className = 'fa fa-moon';
    text.textContent = '';
    toggleButton.title = "Switch to Dark Mode";
  }

  // Update local storage with the selected theme
  localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
  
  
  updateCodeWrappers();
}


// Apply Theme Preference on Page Load
function applyThemePreference() {
  var body = document.body;
  var navbar = document.querySelector('.navbar');
  var icon = document.querySelector('#theme-toggle i');
  var text = document.querySelector('#theme-toggle span');
  var toggleButton = document.querySelector('#theme-toggle');

  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    navbar.classList.add('dark-mode');
    icon.className = 'fa fa-sun';
    text.textContent = '';
    toggleButton.title = "Switch to Light Mode";
  } else {
    body.classList.remove('dark-mode');
    navbar.classList.remove('dark-mode');
    icon.className = 'fa fa-moon';
    text.textContent = '';
    toggleButton.title = "Switch to Dark Mode";
  }


  updateCodeWrappers();
}

// Update Code Wrappers for Dark and Light Modes
function updateCodeWrappers() {
  const codeWrappers = document.querySelectorAll('.code-wrapper');
  codeWrappers.forEach(wrapper => {
    const pre = wrapper.querySelector('pre');
    const code = wrapper.querySelector('code');
    const copyIcon = wrapper.querySelector('.copy-icon');
    const modeIcon = wrapper.querySelector('.mode-icon');

    if (document.body.classList.contains('dark-mode')) {
      pre.classList.remove('light-mode');
      pre.classList.add('dark-mode');
      code.classList.remove('light-mode');
      code.classList.add('dark-mode');
      copyIcon.style.color = 'white';
      modeIcon.classList.remove('fa-moon');
      modeIcon.classList.add('fa-sun');
      modeIcon.style.color = '#ffffff';
    } else {
      pre.classList.remove('dark-mode');
      pre.classList.add('light-mode');
      code.classList.remove('dark-mode');
      code.classList.add('light-mode');
      copyIcon.style.color = 'black';
      modeIcon.classList.remove('fa-sun');
      modeIcon.classList.add('fa-moon');
      modeIcon.style.color = '#000000';
    }
  });
}







// Apply the initial mode to code wrappers
function applyInitialMode(wrapper) {
  const pre = wrapper.querySelector('pre');
  const code = wrapper.querySelector('code');
  const copyIcon = wrapper.querySelector('.copy-icon');
  const modeIcon = wrapper.querySelector('.mode-icon');
  if (document.body.classList.contains('dark-mode')) {
    pre.classList.remove('light-mode');
    pre.classList.add('dark-mode');
    code.classList.remove('light-mode');
    code.classList.add('dark-mode');
    copyIcon.style.color = 'white';
    modeIcon.classList.remove('fa-moon');
    modeIcon.classList.add('fa-sun');
    modeIcon.style.color = '#ffffff';
  } else {
    pre.classList.remove('dark-mode');
    pre.classList.add('light-mode');
    code.classList.remove('dark-mode');
    code.classList.add('light-mode');
    copyIcon.style.color = 'black';
    modeIcon.classList.remove('fa-sun');
    modeIcon.classList.add('fa-moon');
    modeIcon.style.color = '#000000';
  }
}

// Set up the dark mode toggle and apply theme preference
document.addEventListener('DOMContentLoaded', function() {
  var navbarLeft = document.querySelector('.navbar .navbar-nav:first-child');
  var toggleLink = document.createElement('li');
  toggleLink.className = 'nav-item';
  toggleLink.innerHTML = '<a href="#" onclick="toggleDarkMode(); event.preventDefault();" class="nav-link" id="theme-toggle" title="Switch to Dark Mode"><i class="fa fa-moon"></i><span></span></a>';
  navbarLeft.appendChild(toggleLink);
  
  applyThemePreference();

  var button = document.createElement('button');
  button.innerHTML = '&#8679; Back to Top';
  button.className = 'back-to-top';
  document.body.appendChild(button);
  button.onclick = function() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  };
  window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  };
});

// Another Back-to-top section NEWW
document.addEventListener('DOMContentLoaded', function() {
  var button = document.createElement('button');
  button.innerHTML = '&#8679; Back to Top';
  button.className = 'back-to-top';
  button.style.position = 'fixed';
  //button.style.bottom = '20px';
  //button.style.right = '20px';
  button.style.display = 'none'; // Initially hidden
  button.style.zIndex = '9999';
  document.body.appendChild(button);

  // Onclick functionality to scroll to the top
  button.onclick = function() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  };

  // Function to show/hide button based on scroll
  window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      button.style.display = "block"; // Show button when user scrolls down
    } else {
      button.style.display = "none";  // Hide button when user scrolls back up
    }
  };
});


// Add event listeners for code wrapper modes and clipboard copy
document.addEventListener('DOMContentLoaded', function() {
  const codeWrappers = document.querySelectorAll('.code-wrapper');

  codeWrappers.forEach(wrapper => {
    const copyIcon = document.createElement('i');
    copyIcon.classList.add('far', 'fa-copy', 'copy-icon');
    wrapper.appendChild(copyIcon);

    const modeIcon = document.createElement('i');
    modeIcon.classList.add('fa', 'fa-moon', 'mode-icon');
    wrapper.appendChild(modeIcon);

    const tooltip = document.createElement('div');
    tooltip.classList.add('copy-tooltip');
    tooltip.innerHTML = '<i class="fas fa-check"></i> Copied!';
    wrapper.appendChild(tooltip);

    copyIcon.addEventListener('click', function() {
      const code = wrapper.querySelector('code').innerText;
      navigator.clipboard.writeText(code).then(function() {
        tooltip.style.opacity = '1';
        copyIcon.classList.remove('fa-copy');
        copyIcon.classList.add('fa-check');
        setTimeout(function() {
          tooltip.style.opacity = '0';
          copyIcon.classList.remove('fa-check');
          copyIcon.classList.add('fa-copy');
        }, 1500);
        console.log('Code copied to clipboard');
      }, function(err) {
        console.error('Could not copy text: ', err);
      });
    });

    modeIcon.addEventListener('click', function() {
      const pre = wrapper.querySelector('pre');
      const code = wrapper.querySelector('code');

      if (pre.classList.contains('dark-mode')) {
        pre.classList.remove('dark-mode');
        pre.classList.add('light-mode');
        code.classList.remove('dark-mode');
        code.classList.add('light-mode');
        modeIcon.classList.remove('fa-sun');
        modeIcon.classList.add('fa-moon');
        modeIcon.style.color = '#000000';
        copyIcon.style.color = 'black';
      } else {
        pre.classList.remove('light-mode');
        pre.classList.add('dark-mode');
        code.classList.remove('light-mode');
        code.classList.add('dark-mode');
        modeIcon.classList.remove('fa-moon');
        modeIcon.classList.add('fa-sun');
        modeIcon.style.color = '#ffffff';
        copyIcon.style.color = 'white';
      }
    });

    applyInitialMode(wrapper);
  });

  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        codeWrappers.forEach(wrapper => {
          applyInitialMode(wrapper);
        });
      }
    });
  });

  observer.observe(document.body, {
    attributes: true
  });
});
