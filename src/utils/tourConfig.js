import { driver } from "driver.js";
import "driver.js/dist/driver.css";

// Tour configuration for different sections
export const dashboardTourSteps = [
  {
    element: ".welcome-section",
    popover: {
      title: "👋 Welcome to The Win-Win Society!",
      description:
        "This is your personalized dashboard where you can track your progress, investments, and opportunities.",
      position: "bottom",
    },
  },
  {
    element: ".stats-container",
    popover: {
      title: "🌟 Your Stats",
      description: "Track your Karma Points and Active Investments. The more you contribute, the more points you earn!",
      position: "bottom",
    },
  },
  {
    element: ".announcements-section",
    popover: {
      title: "📢 Stay Updated",
      description: "Never miss important updates! High-priority announcements will be highlighted in gold.",
      position: "bottom",
    },
  },
  {
    element: ".actions-section",
    popover: {
      title: "⚡ Quick Actions",
      description:
        "Find opportunities to earn Karma Points and contribute to the community. Each action brings rewards!",
      position: "left",
    },
  },
  {
    element: ".investments-section",
    popover: {
      title: "📈 Investment Tracking",
      description: "Monitor your investment portfolio and track performance in real-time.",
      position: "left",
    },
  },
  {
    element: ".social-accounts-section",
    popover: {
      title: "🤝 Connect & Engage",
      description: "Join our community on various platforms to stay connected and get exclusive updates.",
      position: "top",
    },
  },
  {
    element: ".profile_info",
    popover: {
      title: "👤 Access Your Profile",
      description: "Click your profile picture here to access and complete your profile information.",
      position: "right",
    },
  },
  {
    element: ".profile-nav-item",
    popover: {
      title: "🎯 Complete Your Profile",
      description: "Head to your profile to unlock all features and increase your visibility!",
      position: "bottom",
    },
  },
];

export const profileViewTourSteps = [
  {
    element: ".btn_gray.save_button",
    popover: {
      title: "✏️ Edit Profile",
      description: "Click here to start filling in your profile information.",
      position: "left",
    },
  },
];

export const profileEditTourSteps = [
  {
    element: ".profile_description_form",
    popover: {
      title: "📝 Complete Your Profile",
      description: "Fill in your information to unlock all features and get personalized opportunities.",
      position: "right",
    },
  },
  {
    element: ".submit_form",
    popover: {
      title: "💾 Save Changes",
      description: "Click Save Changes when you're done.",
      position: "top",
    },
  },
];

export const projectInvolvementTourSteps = [
  {
    element: ".project-involvement-form",
    popover: {
      title: "🚀 Add Your Projects",
      description:
        "Share the projects you're involved with. This helps us connect you with relevant opportunities and partners.",
      position: "right",
    },
  },
  {
    element: ".project-details",
    popover: {
      title: "📊 Project Details",
      description:
        "Provide comprehensive information about your projects. The more details you add, the better connections we can make!",
      position: "left",
    },
  },
  {
    element: ".synergy_angles",
    popover: {
      title: "🤝 Synergy Opportunities",
      description:
        "Specify how your project can collaborate with others. This helps in matching you with potential partners.",
      position: "bottom",
    },
  },
];

export const ambassadorTourSteps = [
  {
    element: ".ambassadors-section",
    popover: {
      title: "🌟 Ambassador Program",
      description:
        "Join our ambassador program to earn rewards while helping grow the community. Special perks await active ambassadors!",
      position: "bottom",
    },
  },
  {
    element: ".ambassador-tasks",
    popover: {
      title: "📋 Available Tasks",
      description: "Browse and complete tasks to earn Karma Points and climb the leaderboard.",
      position: "right",
    },
  },
];

// Tour initialization function with enhanced configuration
export const initializeTour = (steps, onComplete) => {
  const driverObj = driver({
    animate: true,
    opacity: 0.4,
    overlayOpacity: 0.2,
    overlayColor: "transparent",
    padding: 10,
    showProgress: true,
    showButtons: ["previous", "next"],
    steps: steps,
    allowClose: true,
    overlayClickNext: false,
    keyboardControl: true,
    stagePadding: 10,
    className: "scoped-driver",
    // popoverClass: 'driver-popover-custom',
    // popoverClass: 'driver-active' ,
    popoverClass: "my-custom-popover-class",
    smoothScroll: true,
    onHighlightStarted: (element) => {
      if (!element) return;
      try {
        element.style.boxShadow = "0 0 0 2px #DCCA87, 0 0 15px rgba(220, 202, 135, 0.5)";
        element.style.position = "relative";
        element.style.zIndex = "10000000000";

        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        window.scrollTo({
          top: rect.top + scrollTop - 100,
          behavior: "smooth",
        });
      } catch (error) {
        console.error("Scroll error:", error);
      }
    },
    onDeselected: (element) => {
      if (!element) return;
      element.style.boxShadow = "";
      element.style.zIndex = "";
    },
    onNext: (element) => {
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    },
    onPrevious: (element) => {
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    },
    onError: (err) => {
      console.error("Tour error:", err);
      driverObj.moveNext();
    },
    onComplete: () => {
      localStorage.setItem("tourCompleted", "true");
      if (onComplete) onComplete();
      toast.success("Tour completed! You can restart it anytime from the help menu.");
    },
  });

  return driverObj;
};

// Enhanced helper function to check if tour is completed
export const isTourCompleted = () => {
  return localStorage.getItem("tourCompleted") === "true";
};

// Enhanced helper function to start specific tour with section tracking
export const startTour = (tourType, isEditMode = false) => {
  try {
    let steps;
    switch (tourType) {
      case "dashboard":
        steps = dashboardTourSteps;
        localStorage.setItem("lastTourSection", "dashboard");
        break;
      case "profile":
        steps = isEditMode ? profileEditTourSteps : profileViewTourSteps;
        localStorage.setItem("lastTourSection", "profile");
        break;
      case "project":
        steps = projectInvolvementTourSteps;
        localStorage.setItem("lastTourSection", "project");
        break;
      case "ambassador":
        steps = ambassadorTourSteps;
        localStorage.setItem("lastTourSection", "ambassador");
        break;
      default:
        steps = dashboardTourSteps;
        localStorage.setItem("lastTourSection", "dashboard");
    }

    const missingElements = steps.filter((step) => !document.querySelector(step.element));
    if (missingElements.length > 0) {
      console.warn(
        "Some tour elements are missing:",
        missingElements.map((step) => step.element)
      );
      steps = steps.filter((step) => document.querySelector(step.element));
    }

    if (steps.length === 0) {
      console.error("No valid tour steps found");
      return;
    }

    const tourDriver = initializeTour(steps);
    tourDriver.drive();
  } catch (error) {
    console.error("Error starting tour:", error);
  }
};
