const getMenuFrontEnd = (role = "USER_ROLE") => {
  const menu = [
    {
      title: "Dashboard",
      icon: "mdi mdi-gauge",
      submenu: [
        { title: "Graph", url: "graph1" },
        { title: "Main", url: "/" },
        { title: "ProgressBar", url: "progress" },
        { title: "Promises", url: "promises" },
        { title: "RXJS", url: "rxjs" },
      ],
    },
    {
      title: "Maintenance",
      icon: "mdi mdi-folder-lock-open",
      submenu: [
        // { title: "Users", url: "users" },
        { title: "Hospitals", url: "hospitals" },
        { title: "Doctors", url: "doctors" },
      ],
    },
  ];

  if (role === "ADMIN_ROLE") {
    menu[1].submenu.unshift({ title: "Users", url: "users" });
  }

  return menu;
};

module.exports = getMenuFrontEnd;
