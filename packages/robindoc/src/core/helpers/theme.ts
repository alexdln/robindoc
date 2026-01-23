export const getTheme = () => {
    const userTheme = localStorage.getItem("r-theme");
    if (userTheme && ["light", "dark"].includes(userTheme)) {
        return userTheme;
    }
    return "system";
};
