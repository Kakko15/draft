document.addEventListener('DOMContentLoaded', () => {
    const LoaderWrapper = document.getElementById('LoaderWrapper');
    const MainContent = document.getElementById('MainContent');

    const InitializeApp = () => {
        setTimeout(() => {
            LoaderWrapper.classList.add('FadeOut');
            
            setTimeout(() => {
                LoaderWrapper.style.display = 'none';
                MainContent.classList.remove('Hidden');
                
                requestAnimationFrame(() => {
                    MainContent.classList.add('Visible');
                });
            }, 300);
        }, 1500); 
    };

    InitializeApp();

    const BtnLogin = document.getElementById('BtnLogin');
    if(BtnLogin) {
        BtnLogin.addEventListener('click', () => {
            BtnLogin.style.transform = 'scale(0.95)';
            setTimeout(() => {
                BtnLogin.style.transform = 'scale(1)';
            }, 150);
        });
    }
});