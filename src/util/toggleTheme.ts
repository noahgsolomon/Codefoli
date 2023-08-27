export const toggleTheme = () => {

    if (document.body.classList.contains('dark')) {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
        window.localStorage.setItem('theme', 'light');
    }
    else {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
        window.localStorage.setItem('theme', 'dark');
    }
}