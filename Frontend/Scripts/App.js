document.addEventListener('DOMContentLoaded', () => {
    const LoaderElement = document.getElementById('LoaderContainer');
    const RootInterface = document.getElementById('AppRoot');
    const ThemeContainerElement = document.getElementById('ThemeDropdownTrigger');
    const ThemeMenuElement = document.getElementById('ThemeMenu');
    const ThemeOptions = document.querySelectorAll('.ThemeOption');
    const CurrentThemeLabel = document.getElementById('CurrentThemeLabel');
    const DynamicHeadlineElement = document.getElementById('DynamicHeadline');

    const HeadlineWords = ["Intelligent", "Rapid", "Eco", "Digital"];
    let CurrentWordIndex = 0;

    const StartDynamicTyping = () => {
        if (!DynamicHeadlineElement) return;

        setInterval(() => {
            DynamicHeadlineElement.classList.add('TextFadeOut');
            DynamicHeadlineElement.classList.remove('TextFadeIn');
            
            setTimeout(() => {
                CurrentWordIndex = (CurrentWordIndex + 1) % HeadlineWords.length;
                DynamicHeadlineElement.innerText = HeadlineWords[CurrentWordIndex];
                
                DynamicHeadlineElement.classList.remove('TextFadeOut');
                DynamicHeadlineElement.classList.add('TextFadeIn');
            }, 500); 
        }, 3500);
    };

    const InitializeTheme = () => {
        const StoredTheme = localStorage.getItem('ActiveTheme') || 'google';
        document.documentElement.setAttribute('data-theme', StoredTheme);
        
        if (ThemeOptions.length > 0) {
            ThemeOptions.forEach(Option => Option.classList.remove('ActiveOption'));
            const ActiveInitialOption = Array.from(ThemeOptions).find(Option => Option.getAttribute('data-value') === StoredTheme);
            
            if (ActiveInitialOption) {
                ActiveInitialOption.classList.add('ActiveOption');
                if (CurrentThemeLabel) {
                    CurrentThemeLabel.innerText = ActiveInitialOption.getAttribute('data-label');
                }
            }
        }
    };

    const SetupScrollAnimations = () => {
        const RevealElements = document.querySelectorAll('.RevealElement');
        
        const AnimationObserver = new IntersectionObserver((Entries, Observer) => {
            Entries.forEach(Entry => {
                if (Entry.isIntersecting) {
                    Entry.target.classList.add('RevealActive');
                    Observer.unobserve(Entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        RevealElements.forEach(Element => {
            AnimationObserver.observe(Element);
        });
    };

    const BootApplication = () => {
        InitializeTheme();
        
        setTimeout(() => {
            LoaderElement.classList.add('StateResolved');
            
            setTimeout(() => {
                LoaderElement.style.display = 'none';
                RootInterface.classList.remove('HiddenState');
                
                requestAnimationFrame(() => {
                    RootInterface.classList.add('VisibleState');
                    SetupScrollAnimations();
                    StartDynamicTyping();
                });
            }, 300);
        }, 1800); 
    };

    BootApplication();

    if (ThemeContainerElement && ThemeMenuElement) {
        ThemeContainerElement.addEventListener('click', (Event) => {
            Event.stopPropagation();
            ThemeMenuElement.classList.toggle('ShowMenu');
            ThemeContainerElement.classList.toggle('MenuOpen');
        });

        document.addEventListener('click', (Event) => {
            if (!ThemeContainerElement.contains(Event.target)) {
                ThemeMenuElement.classList.remove('ShowMenu');
                ThemeContainerElement.classList.remove('MenuOpen');
            }
        });

        ThemeOptions.forEach(Option => {
            Option.addEventListener('click', (Event) => {
                Event.stopPropagation();
                const SelectedTheme = Option.getAttribute('data-value');
                const ThemeName = Option.getAttribute('data-label');

                document.documentElement.setAttribute('data-theme', SelectedTheme);
                localStorage.setItem('ActiveTheme', SelectedTheme);
                
                if (CurrentThemeLabel) {
                    CurrentThemeLabel.innerText = ThemeName;
                }

                ThemeOptions.forEach(Opt => Opt.classList.remove('ActiveOption'));
                Option.classList.add('ActiveOption');

                ThemeMenuElement.classList.remove('ShowMenu');
                ThemeContainerElement.classList.remove('MenuOpen');
            });
        });
    }

    const InteractiveButtons = document.querySelectorAll('.ButtonPrimary, .ButtonSecondary');
    
    InteractiveButtons.forEach(Button => {
        Button.addEventListener('click', () => {
            Button.style.transform = 'scale(0.96)';
            setTimeout(() => {
                Button.style.transform = 'scale(1)';
            }, 150);
        });
    });
});