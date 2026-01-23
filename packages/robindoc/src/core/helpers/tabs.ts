export const getTabs = () => {
    const store = localStorage.getItem("r-tabs");
    const items = store?.split(";").filter((item) => item && /[\w-]+=[\w]+/.test(item)) || [];
    return items;
};
