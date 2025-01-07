import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import toast from "react-hot-toast";

// Common configuration for all tours
const commonConfig = {
  animate: true,
  opacity: 0.8,
  padding: 12,
  allowClose: true,
  overlayClickNext: false,
  doneBtnText: "🎉 Complete",
  closeBtnText: "⏳ Continue Later",
  nextBtnText: "Next Step →",
  prevBtnText: "← Previous",
  keyboardControl: true,
  showButtons: ["previous", "next", "close"],
  showProgress: true,
  progressText: "Step {{current}} of {{total}}",
  onPopoverRender: (popover) => {
    const progress = (popover.currentStep / popover.totalSteps) * 100;
    toast.success(`Progress: ${Math.round(progress)}% Complete!`, {
      icon: "🎯",
      duration: 2000,
    });
  },
};

// Enhanced dashboard tour with more interactive elements
export const dashboardTourSteps = [
  {
    element: ".welcome-section",
    popover: {
      title: "👋 Welcome to Your Journey!",
      description:
        "Your personalized command center awaits! Here you'll track your progress, discover opportunities, and build your Web3 empire. Ready to begin?",
      position: "bottom",
      showButtons: ["close", "next"],
    },
  },
  {
    element: ".announcements-section",
    popover: {
      title: "📢 Your Insider News Hub",
      description:
        "Get the inside scoop! Breaking news, exclusive opportunities, and community highlights - all in one place. Stay ahead of the curve!",
      position: "bottom",
    },
  },
  {
    element: ".actions-section",
    popover: {
      title: "⭐ Power Up Your Journey",
      description:
        "Your action center! Complete missions, earn rewards, and level up your presence. Each action brings you closer to unlocking exclusive perks!",
      position: "left",
    },
  },
  {
    element: ".karma-points",
    popover: {
      title: "✨ Your Karma Power",
      description:
        "Watch your influence grow! Karma points are your reputation currency. The more you contribute, the more doors open for you.",
      position: "bottom",
    },
  },
  {
    element: ".investments-section",
    popover: {
      title: "💎 Your Investment Command Center",
      description:
        "Track your portfolio like a pro! Monitor performance, spot trends, and seize opportunities. Your gateway to Web3 success starts here!",
      position: "left",
    },
  },
  {
    element: ".social-accounts-section",
    popover: {
      title: "🌐 Your Network Hub",
      description:
        "Expand your influence! Connect with thought leaders, join exclusive communities, and stay in the loop. Your network is your net worth!",
      position: "top",
    },
  },
  {
    element: ".sidebar",
    popover: {
      title: "🎮 Your Control Panel",
      description:
        "Your gateway to everything! Navigate through different zones, each packed with unique features and opportunities. Pro tip: Complete your profile to unlock everything!",
      position: "right",
    },
  },
  {
    element: ".profile-nav-item",
    popover: {
      title: "🎯 Level Up Your Profile!",
      description:
        "Your next mission: Create a stellar profile! This is your digital identity in the Web3 space. Make it count! Ready to stand out?",
      position: "bottom",
      showButtons: ["previous", "done"],
    },
  },
];

// Enhanced profile tour with better guidance
export const profileTourSteps = [
  {
    element: ".header_toggle_button",
    popover: {
      title: "🎨 Your Profile Canvas",
      description:
        "Welcome to your profile studio! Each tab is a different aspect of your digital identity. Let's make you stand out in the Web3 space!",
      position: "bottom",
      showButtons: ["close", "next"],
    },
  },
  {
    element: '[data-tab="INFORMATION"]',
    popover: {
      title: "📝 Craft Your Story",
      description:
        "This is where your journey begins! Share your vision, expertise, and aspirations. Remember: A complete profile opens more doors!",
      position: "bottom",
    },
  },
  {
    element: ".profile-section",
    popover: {
      title: "👤 Show Your Best Self",
      description:
        "Time to shine! Each detail you add helps us connect you with perfect opportunities. Pro tip: Be authentic and showcase your unique strengths!",
      position: "right",
    },
  },
  {
    element: ".social-accounts-section",
    popover: {
      title: "🔗 Build Trust & Credibility",
      description:
        "Verify your digital presence! Connected accounts show you're a real player in the space. Plus, it helps us tailor opportunities just for you!",
      position: "left",
    },
  },
  {
    element: '[data-tab="INVOLVEMENT"]',
    popover: {
      title: "🚀 Showcase Your Impact",
      description:
        "Your project portfolio awaits! Share your achievements, roles, and contributions. Let others see the value you bring to the table!",
      position: "bottom",
    },
  },
  {
    element: '[data-tab="AMBASSADORS"]',
    popover: {
      title: "👑 Unlock Elite Status",
      description:
        "Ready to join the elite? Become an ambassador to unlock exclusive perks, early access, and special rewards. Your influence matters!",
      position: "bottom",
      showButtons: ["previous", "done"],
    },
  },
];

// Enhanced project involvement tour
export const projectInvolvementTourSteps = [
  {
    element: ".project-involvement-form",
    popover: {
      title: "🎯 Your Project Showcase",
      description:
        "Time to highlight your achievements! Be specific about your roles and impact. Remember: Quality details attract quality opportunities!",
      position: "right",
      showButtons: ["close", "next"],
    },
  },
  {
    element: ".project-details",
    popover: {
      title: "📊 Impact Metrics",
      description:
        "Numbers tell stories! Share your wins, growth metrics, and key achievements. Make your contributions impossible to ignore!",
      position: "left",
      showButtons: ["previous", "done"],
    },
  },
];

// Enhanced ambassador tour
export const ambassadorTourSteps = [
  {
    element: ".ambassadors-section",
    popover: {
      title: "🌟 Elite Ambassador Zone",
      description:
        "Welcome to the next level! As an ambassador, you'll get VIP access, exclusive rewards, and the power to shape the community. Ready to lead?",
      position: "bottom",
      showButtons: ["close", "done"],
    },
  },
];

// Enhanced tour initialization with interactive features
export const initializeTour = (steps, onComplete) => {
  const driverObj = driver({
    ...commonConfig,
    steps: steps.map((step) => ({
      ...step,
      popover: {
        ...step.popover,
        className: "driver-popover-custom",
      },
    })),
    onHighlightStarted: (element) => {
      element.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
      element.style.transform = "scale(1.05)";
      element.style.boxShadow = "0 0 30px rgba(220, 202, 135, 0.3)";
    },
    onHighlightEnded: (element) => {
      element.style.transform = "scale(1)";
      element.style.boxShadow = "none";
    },
    onDeselected: (element) => {
      element.style.animation = "none";
    },
    onComplete: () => {
      toast.success("🎉 Tour Completed! You're ready to rock!", {
        duration: 3000,
        icon: "🏆",
      });
      if (onComplete) onComplete();
    },
  });

  return driverObj;
};

// Enhanced completion tracking with rewards
export const isTourCompleted = (tourType = "all") => {
  const completedTours = JSON.parse(localStorage.getItem("completedTours") || "{}");
  if (tourType === "all") {
    return completedTours.dashboard && completedTours.profile && completedTours.project && completedTours.ambassador;
  }
  return completedTours[tourType];
};

const markTourCompleted = (tourType) => {
  const completedTours = JSON.parse(localStorage.getItem("completedTours") || "{}");
  completedTours[tourType] = true;
  localStorage.setItem("completedTours", JSON.stringify(completedTours));

  // Reward completion
  const completionCount = Object.values(completedTours).filter(Boolean).length;
  if (completionCount === Object.keys(completedTours).length) {
    toast.success("🏆 All tours completed! You're a platform master!", {
      duration: 4000,
      icon: "🌟",
    });
  }
};

// Enhanced tour starter with better UX
export const startTour = (tourType) => {
  if (isTourCompleted(tourType)) return;

  let steps;
  switch (tourType) {
    case "dashboard":
      steps = dashboardTourSteps;
      break;
    case "profile":
      steps = profileTourSteps;
      break;
    case "project":
      steps = projectInvolvementTourSteps;
      break;
    case "ambassador":
      steps = ambassadorTourSteps;
      break;
    default:
      steps = dashboardTourSteps;
  }

  const tourDriver = initializeTour(steps, () => markTourCompleted(tourType));
  tourDriver.drive();
};
