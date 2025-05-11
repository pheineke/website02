/**
 * Theme Manager for Planner App
 * Handles theme application across all pages
 */

document.addEventListener('DOMContentLoaded', function() {
    // Default theme settings
    const defaultTheme = {
        primary: '#3498db',
        secondary: '#2ecc71',
        accent: '#9b59b6',
        lightBg: '#ecf0f1',
        cardBg: '#ffffff',
        text: '#2c3e50',
        border: '#bdc3c7',
        shadow: 'rgba(0, 0, 0, 0.1)'
    };

    // Predefined themes
    const themes = {
        default: defaultTheme,
        dark: {
            primary: '#3498db',
            secondary: '#2ecc71',
            accent: '#9b59b6',
            lightBg: '#2c3e50',
            cardBg: '#34495e',
            text: '#ecf0f1',
            border: '#7f8c8d',
            shadow: 'rgba(0, 0, 0, 0.3)'
        },
        solarized: {
            primary: '#268bd2',
            secondary: '#859900',
            accent: '#d33682',
            lightBg: '#fdf6e3',
            cardBg: '#eee8d5',
            text: '#073642',
            border: '#93a1a1',
            shadow: 'rgba(0, 0, 0, 0.1)'
        },
        nord: {
            primary: '#5e81ac',
            secondary: '#a3be8c',
            accent: '#b48ead',
            lightBg: '#eceff4',
            cardBg: '#e5e9f0',
            text: '#2e3440',
            border: '#d8dee9',
            shadow: 'rgba(0, 0, 0, 0.1)'
        },
        material: {
            primary: '#2196f3',
            secondary: '#4caf50',
            accent: '#9c27b0',
            lightBg: '#eeeeee',
            cardBg: '#ffffff',
            text: '#212121',
            border: '#bdbdbd',
            shadow: 'rgba(0, 0, 0, 0.14)'
        },
        pastel: {
            primary: '#79a8ff',
            secondary: '#91db69',
            accent: '#e0a2ff',
            lightBg: '#f0f0f0',
            cardBg: '#ffffff',
            text: '#666666',
            border: '#dddddd',
            shadow: 'rgba(0, 0, 0, 0.05)'
        }
    };

    // Apply theme based on localStorage
    function applyTheme() {
        const savedTheme = localStorage.getItem('plannerTheme') || 'default';
        let themeData;
        
        if (savedTheme === 'custom' && localStorage.getItem('customTheme')) {
            try {
                themeData = JSON.parse(localStorage.getItem('customTheme'));
            } catch (e) {
                console.error('Failed to parse custom theme:', e);
                themeData = themes.default;
                localStorage.setItem('plannerTheme', 'default');
            }
        } else {
            themeData = themes[savedTheme] || themes.default;
        }
        
        // Apply theme to CSS variables
        document.documentElement.style.setProperty('--primary', themeData.primary);
        document.documentElement.style.setProperty('--secondary', themeData.secondary);
        document.documentElement.style.setProperty('--accent', themeData.accent);
        document.documentElement.style.setProperty('--light-bg', themeData.lightBg);
        document.documentElement.style.setProperty('--card-bg', themeData.cardBg);
        document.documentElement.style.setProperty('--text', themeData.text);
        document.documentElement.style.setProperty('--border', themeData.border);
        document.documentElement.style.setProperty('--shadow', themeData.shadow);
        
        console.log('Theme applied:', savedTheme);
        
        // Trigger event for other scripts to react to theme changes
        const themeChangeEvent = new CustomEvent('themeChanged', {
            detail: { 
                themeName: savedTheme,
                themeData: themeData
            }
        });
        document.dispatchEvent(themeChangeEvent);
    }
    
    // Apply theme immediately
    applyTheme();
    
    // Listen for storage changes (from other tabs/windows)
    window.addEventListener('storage', function(e) {
        if (e.key === 'plannerTheme' || e.key === 'customTheme') {
            applyTheme();
            
            // Update active state if quick selector exists
            const quickSelectContainer = document.querySelector('.quick-theme-selector');
            if (quickSelectContainer) {
                updateActiveThemeIndicator(quickSelectContainer);
            }
        }
    });
    
    // Add a mini theme selector to the page if it has the theme-quick-select class
    const quickSelectContainer = document.querySelector('.theme-quick-select');
    if (quickSelectContainer) {
        createQuickThemeSelector(quickSelectContainer);
    }
    
    function createQuickThemeSelector(container) {
        // Create the theme selector UI
        const selector = document.createElement('div');
        selector.className = 'quick-theme-selector';
        
        // Add theme options
        const themeNames = Object.keys(themes);
        themeNames.forEach(themeName => {
            const themeOption = document.createElement('button');
            themeOption.className = 'theme-option';
            themeOption.setAttribute('data-theme', themeName);
            themeOption.title = `${themeName.charAt(0).toUpperCase() + themeName.slice(1)} Theme`;
            
            // Style based on theme colors
            themeOption.style.backgroundColor = themes[themeName].lightBg;
            themeOption.style.border = `2px solid ${themes[themeName].primary}`;
            
            // Add accent color indicator
            const accentDot = document.createElement('span');
            accentDot.className = 'accent-dot';
            accentDot.style.backgroundColor = themes[themeName].accent;
            themeOption.appendChild(accentDot);
            
            // Handle click to change theme
            themeOption.addEventListener('click', function() {
                localStorage.setItem('plannerTheme', themeName);
                applyTheme();
                updateActiveThemeIndicator(selector);
            });
            
            selector.appendChild(themeOption);
        });
        
        // Add custom theme option if it exists
        if (localStorage.getItem('customTheme')) {
            const customTheme = JSON.parse(localStorage.getItem('customTheme'));
            const customOption = document.createElement('button');
            customOption.className = 'theme-option custom-theme-option';
            customOption.setAttribute('data-theme', 'custom');
            customOption.title = 'Custom Theme';
            
            // Style based on custom theme colors
            customOption.style.backgroundColor = customTheme.lightBg;
            customOption.style.border = `2px solid ${customTheme.primary}`;
            
            // Add accent color indicator
            const accentDot = document.createElement('span');
            accentDot.className = 'accent-dot';
            accentDot.style.backgroundColor = customTheme.accent;
            customOption.appendChild(accentDot);
            
            // Add star icon overlay to indicate custom theme
            const customIndicator = document.createElement('span');
            customIndicator.className = 'custom-indicator';
            customIndicator.innerHTML = '★';
            customOption.appendChild(customIndicator);
            
            // Handle click to change theme
            customOption.addEventListener('click', function() {
                localStorage.setItem('plannerTheme', 'custom');
                applyTheme();
                updateActiveThemeIndicator(selector);
            });
            
            selector.appendChild(customOption);
        }
        
        // Add settings link
        const settingsLink = document.createElement('a');
        settingsLink.href = '/settings';
        settingsLink.className = 'settings-link';
        settingsLink.innerHTML = '<i class="fas fa-cog"></i>';
        settingsLink.title = 'Theme Settings';
        selector.appendChild(settingsLink);
        
        // Add to the container
        container.innerHTML = ''; // Clear any existing content
        container.appendChild(selector);
        
        // Mark active theme
        updateActiveThemeIndicator(selector);
    }
    
    function updateActiveThemeIndicator(container) {
        const activeTheme = localStorage.getItem('plannerTheme') || 'default';
        const options = container.querySelectorAll('.theme-option');
        
        options.forEach(option => {
            if (option.getAttribute('data-theme') === activeTheme) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }
});