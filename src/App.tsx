import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import './App.css';

type Language = 'en' | 'kn' | 'hi' | 'te' | 'ta' | 'ml';

type Page =
  | 'Home'
  | 'AI Assistant'
  | 'Shopping Assistant'
  | 'Finance & Budget'
  | 'Fraud Detector'
  | 'Group Expenses'
  | 'Business Tools'
  | 'Transactions'
  | 'Settings';

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: 'Home',
    assistant: 'AI Assistant',
    shopping: 'Shopping Assistant',
    finance: 'Finance & Budget',
    fraud: 'Fraud Detector',
    groups: 'Group Expenses',
    business: 'Business Tools',
    transactions: 'Transactions',
    settings: 'Settings',
    welcome: 'Your AI-Powered Payment & Finance Companion',
    subtitle: 'Shop smarter, spend better, stay safe, and grow your business.',
    chat: 'Chat with AI Assistant',
    account: 'Account Overview',
    balance: 'Available Balance',
    send: 'Send',
    request: 'Request',
    addMoney: 'Add Money',
    spending: 'Spending Overview',
    thisMonth: 'This Month',
    shoppingCategory: 'Shopping',
    food: 'Food & Dining',
    transport: 'Transport',
    subscriptions: 'Subscriptions',
    others: 'Others',
    recent: 'Recent Transactions',
    viewAll: 'View All',
    insights: 'AI Insights',
    shoppingInsight: 'You spent more on shopping this month.',
    shoppingAdvice: 'Consider setting a budget to save more.',
    savingsInsight: 'You could save money on subscriptions.',
    fraudInsight: 'Suspicious payment detected in demo data.',
    safe: 'Demo account',
    connected: 'Demo Mode',
    language: 'Language & Region',
    selectLanguage: 'Choose your preferred language',
    save: 'Your preference is saved automatically.',
    search: 'Search transactions or ask AI...',
    greeting: "Hi! I'm PayPilot AI",
    assistantDesc: 'I can help with budgeting, shopping, spending analysis, and payment safety.',
    message: 'Type your message...',
    newChat: 'New Chat',
    quickActions: 'Quick Actions',
    split: 'Split Expense',
    invoice: 'Create Invoice',
    budget: 'Monthly Budget',
    fraudTitle: 'Fraud Detection',
    fraudDesc: 'Review suspicious transactions and learn how to stay safe.',
    shoppingTitle: 'Smart Shopping',
    shoppingDesc: 'Compare products and plan your purchases.',
    financeTitle: 'Personal Finance',
    financeDesc: 'Understand your spending and plan your budget.',
    groupTitle: 'Group Expenses',
    groupDesc: 'Organize shared expenses with friends.',
    businessTitle: 'Business Tools',
    businessDesc: 'Manage invoices and track business finances.',
    transactionsTitle: 'Transaction History',
    allTransactions: 'All Transactions',
    settingsTitle: 'Settings',
    appearance: 'Appearance',
    darkMode: 'Dark Mode',
    darkDescription: 'Use the dark appearance.',
    preferences: 'Preferences',
    privacy: 'Privacy & Security',
    demoNotice: 'Demo data only. No real money is transferred.',
    amount: 'Amount',
    analyze: 'Analyze',
    create: 'Create',
    askAnything: 'Ask me anything about your finances.',
    today: 'Today',
    noMessages: 'Start a conversation with PayPilot AI.',
    totalSpent: 'Total Spent',
    monthlyBudget: 'Monthly Budget',
    remaining: 'Remaining',
    budgetHelp: 'Set a spending limit to manage your money.',
    groupHelp: 'Enter an expense amount to split it equally.',
    people: 'Number of people',
    splitResult: 'Each person pays',
    invoiceHelp: 'Create a demo invoice.',
    customer: 'Customer name',
    description: 'Description',
    dueDate: 'Due date',
    generate: 'Generate',
    invoiceCreated: 'Demo invoice created successfully.',
    safePayment: 'Payment safety tips',
    safety1: 'Never share your password or one-time passcode.',
    safety2: 'Check the recipient before making a payment.',
    safety3: 'Review unfamiliar transactions immediately.',
    noRealAccount: 'No real financial account is connected.',
    searchResults: 'Search results',
    noResults: 'No matching transactions.',
    languageChanged: 'Language updated successfully.',
    welcomeBack: 'Welcome back!',
    dashboard: 'Dashboard',
    paymentReceived: 'Payment from John',
    amazon: 'Amazon',
    starbucks: 'Starbucks',
    spotify: 'Spotify',
    netflix: 'Netflix',
    friend: 'Friends',
    transactionDate: 'Date',
    category: 'Category',
    status: 'Status',
    completed: 'Completed',
    featureUnavailable: 'This is a demo feature. No real transaction will be performed.',
  },

  kn: {
    home: 'ಮುಖಪುಟ',
    assistant: 'AI ಸಹಾಯಕ',
    shopping: 'ಶಾಪಿಂಗ್ ಸಹಾಯಕ',
    finance: 'ಹಣಕಾಸು ಮತ್ತು ಬಜೆಟ್',
    fraud: 'ವಂಚನೆ ಪತ್ತೆ',
    groups: 'ಗುಂಪು ವೆಚ್ಚಗಳು',
    business: 'ವ್ಯಾಪಾರ ಸಾಧನಗಳು',
    transactions: 'ವಹಿವಾಟುಗಳು',
    settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    welcome: 'ನಿಮ್ಮ AI ಆಧಾರಿತ ಪಾವತಿ ಮತ್ತು ಹಣಕಾಸು ಸಹಾಯಕ',
    subtitle: 'ಬುದ್ಧಿವಂತಿಕೆಯಿಂದ ಖರೀದಿಸಿ, ಹಣ ಉಳಿಸಿ ಮತ್ತು ಸುರಕ್ಷಿತವಾಗಿರಿ.',
    chat: 'AI ಸಹಾಯಕರೊಂದಿಗೆ ಚಾಟ್ ಮಾಡಿ',
    account: 'ಖಾತೆಯ ವಿವರಗಳು',
    balance: 'ಲಭ್ಯವಿರುವ ಮೊತ್ತ',
    send: 'ಕಳುಹಿಸಿ',
    request: 'ಕೋರಿಕೆ',
    addMoney: 'ಹಣ ಸೇರಿಸಿ',
    spending: 'ಖರ್ಚಿನ ವಿವರಗಳು',
    thisMonth: 'ಈ ತಿಂಗಳು',
    shoppingCategory: 'ಶಾಪಿಂಗ್',
    food: 'ಆಹಾರ ಮತ್ತು ಊಟ',
    transport: 'ಸಾರಿಗೆ',
    subscriptions: 'ಚಂದಾದಾರಿಕೆಗಳು',
    others: 'ಇತರೆ',
    recent: 'ಇತ್ತೀಚಿನ ವಹಿವಾಟುಗಳು',
    viewAll: 'ಎಲ್ಲವನ್ನೂ ನೋಡಿ',
    insights: 'AI ಒಳನೋಟಗಳು',
    shoppingInsight: 'ಈ ತಿಂಗಳು ಶಾಪಿಂಗ್‌ಗೆ ಹೆಚ್ಚು ಖರ್ಚು ಮಾಡಿದ್ದೀರಿ.',
    shoppingAdvice: 'ಹಣ ಉಳಿಸಲು ಬಜೆಟ್ ರೂಪಿಸಿ.',
    savingsInsight: 'ಚಂದಾದಾರಿಕೆಗಳಲ್ಲಿ ಹಣ ಉಳಿಸಬಹುದು.',
    fraudInsight: 'ಡೆಮೊದಲ್ಲಿ ಅನುಮಾನಾಸ್ಪದ ಪಾವತಿ ಕಂಡುಬಂದಿದೆ.',
    safe: 'ಡೆಮೊ ಖಾತೆ',
    connected: 'ಡೆಮೊ ಮೋಡ್',
    language: 'ಭಾಷೆ ಮತ್ತು ಪ್ರದೇಶ',
    selectLanguage: 'ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    save: 'ನಿಮ್ಮ ಆಯ್ಕೆಯನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಉಳಿಸಲಾಗುತ್ತದೆ.',
    search: 'ವಹಿವಾಟುಗಳನ್ನು ಹುಡುಕಿ ಅಥವಾ AI ಅನ್ನು ಕೇಳಿ...',
    greeting: 'ನಮಸ್ಕಾರ! ನಾನು PayPilot AI',
    assistantDesc: 'ಬಜೆಟ್, ಖರೀದಿ, ಖರ್ಚಿನ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಪಾವತಿ ಸುರಕ್ಷತೆಯಲ್ಲಿ ಸಹಾಯ ಮಾಡುತ್ತೇನೆ.',
    message: 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಬರೆಯಿರಿ...',
    newChat: 'ಹೊಸ ಚಾಟ್',
    quickActions: 'ತ್ವರಿತ ಕಾರ್ಯಗಳು',
    split: 'ವೆಚ್ಚ ಹಂಚಿಕೆ',
    invoice: 'ಇನ್‌ವಾಯ್ಸ್ ರಚಿಸಿ',
    budget: 'ತಿಂಗಳ ಬಜೆಟ್',
    fraudTitle: 'ವಂಚನೆ ಪತ್ತೆ',
    fraudDesc: 'ಅನುಮಾನಾಸ್ಪದ ವಹಿವಾಟುಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.',
    shoppingTitle: 'ಸ್ಮಾರ್ಟ್ ಶಾಪಿಂಗ್',
    shoppingDesc: 'ಉತ್ಪನ್ನಗಳನ್ನು ಹೋಲಿಸಿ ಮತ್ತು ಖರೀದಿಗಳನ್ನು ಯೋಜಿಸಿ.',
    financeTitle: 'ವೈಯಕ್ತಿಕ ಹಣಕಾಸು',
    financeDesc: 'ಖರ್ಚುಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಂಡು ಬಜೆಟ್ ರೂಪಿಸಿ.',
    groupTitle: 'ಗುಂಪು ವೆಚ್ಚಗಳು',
    groupDesc: 'ಸ್ನೇಹಿತರೊಂದಿಗೆ ಹಂಚಿಕೊಂಡ ವೆಚ್ಚಗಳನ್ನು ನಿರ್ವಹಿಸಿ.',
    businessTitle: 'ವ್ಯಾಪಾರ ಸಾಧನಗಳು',
    businessDesc: 'ಇನ್‌ವಾಯ್ಸ್ ಮತ್ತು ವ್ಯಾಪಾರ ಹಣಕಾಸನ್ನು ನಿರ್ವಹಿಸಿ.',
    transactionsTitle: 'ವಹಿವಾಟಿನ ಇತಿಹಾಸ',
    allTransactions: 'ಎಲ್ಲಾ ವಹಿವಾಟುಗಳು',
    settingsTitle: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    appearance: 'ಗೋಚರತೆ',
    darkMode: 'ಡಾರ್ಕ್ ಮೋಡ್',
    darkDescription: 'ಡಾರ್ಕ್ ವಿನ್ಯಾಸ ಬಳಸಿ.',
    preferences: 'ಆದ್ಯತೆಗಳು',
    privacy: 'ಗೌಪ್ಯತೆ ಮತ್ತು ಭದ್ರತೆ',
    demoNotice: 'ಇದು ಡೆಮೊ ಮಾಹಿತಿ. ನಿಜವಾದ ಹಣ ವರ್ಗಾವಣೆಯಾಗುವುದಿಲ್ಲ.',
    amount: 'ಮೊತ್ತ',
    analyze: 'ವಿಶ್ಲೇಷಿಸಿ',
    create: 'ರಚಿಸಿ',
    askAnything: 'ನಿಮ್ಮ ಹಣಕಾಸಿನ ಬಗ್ಗೆ ಏನನ್ನಾದರೂ ಕೇಳಿ.',
    today: 'ಇಂದು',
    noMessages: 'PayPilot AI ಜೊತೆ ಸಂಭಾಷಣೆ ಪ್ರಾರಂಭಿಸಿ.',
    totalSpent: 'ಒಟ್ಟು ಖರ್ಚು',
    monthlyBudget: 'ತಿಂಗಳ ಬಜೆಟ್',
    remaining: 'ಉಳಿದ ಮೊತ್ತ',
    budgetHelp: 'ಹಣ ನಿರ್ವಹಿಸಲು ಖರ್ಚಿನ ಮಿತಿ ನಿಗದಿಪಡಿಸಿ.',
    groupHelp: 'ವೆಚ್ಚವನ್ನು ಸಮಾನವಾಗಿ ಹಂಚಲು ಮೊತ್ತ ನಮೂದಿಸಿ.',
    people: 'ಜನರ ಸಂಖ್ಯೆ',
    splitResult: 'ಪ್ರತಿಯೊಬ್ಬರ ಪಾಲು',
    invoiceHelp: 'ಡೆಮೊ ಇನ್‌ವಾಯ್ಸ್ ರಚಿಸಿ.',
    customer: 'ಗ್ರಾಹಕರ ಹೆಸರು',
    description: 'ವಿವರಣೆ',
    dueDate: 'ಕೊನೆಯ ದಿನಾಂಕ',
    generate: 'ರಚಿಸಿ',
    invoiceCreated: 'ಡೆಮೊ ಇನ್‌ವಾಯ್ಸ್ ಯಶಸ್ವಿಯಾಗಿ ರಚಿಸಲಾಗಿದೆ.',
    safePayment: 'ಪಾವತಿ ಸುರಕ್ಷತಾ ಸಲಹೆಗಳು',
    safety1: 'ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ಅಥವಾ OTP ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.',
    safety2: 'ಪಾವತಿಸುವ ಮೊದಲು ಸ್ವೀಕರಿಸುವವರನ್ನು ಪರಿಶೀಲಿಸಿ.',
    safety3: 'ಅಪರಿಚಿತ ವಹಿವಾಟುಗಳನ್ನು ತಕ್ಷಣ ಪರಿಶೀಲಿಸಿ.',
    noRealAccount: 'ನಿಜವಾದ ಹಣಕಾಸು ಖಾತೆ ಸಂಪರ್ಕಗೊಂಡಿಲ್ಲ.',
    searchResults: 'ಹುಡುಕಾಟ ಫಲಿತಾಂಶಗಳು',
    noResults: 'ಹೊಂದಾಣಿಕೆಯ ವಹಿವಾಟುಗಳಿಲ್ಲ.',
    languageChanged: 'ಭಾಷೆಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಬದಲಾಯಿಸಲಾಗಿದೆ.',
    welcomeBack: 'ಮತ್ತೆ ಸ್ವಾಗತ!',
    dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    paymentReceived: 'ಜಾನ್‌ನಿಂದ ಪಾವತಿ',
    amazon: 'ಅಮೆಜಾನ್',
    starbucks: 'ಸ್ಟಾರ್‌ಬಕ್ಸ್',
    spotify: 'ಸ್ಪಾಟಿಫೈ',
    netflix: 'ನೆಟ್‌ಫ್ಲಿಕ್ಸ್',
    friend: 'ಸ್ನೇಹಿತರು',
    transactionDate: 'ದಿನಾಂಕ',
    category: 'ವರ್ಗ',
    status: 'ಸ್ಥಿತಿ',
    completed: 'ಪೂರ್ಣಗೊಂಡಿದೆ',
    featureUnavailable: 'ಇದು ಡೆಮೊ ವೈಶಿಷ್ಟ್ಯ. ನಿಜವಾದ ವಹಿವಾಟು ನಡೆಯುವುದಿಲ್ಲ.',
  },

  hi: {
    home: 'होम',
    assistant: 'AI सहायक',
    shopping: 'शॉपिंग सहायक',
    finance: 'वित्त और बजट',
    fraud: 'धोखाधड़ी पहचान',
    groups: 'समूह खर्च',
    business: 'व्यावसायिक टूल',
    transactions: 'लेन-देन',
    settings: 'सेटिंग्स',
    welcome: 'आपका AI-संचालित भुगतान और वित्त सहायक',
    subtitle: 'समझदारी से खरीदारी करें, पैसे बचाएँ और सुरक्षित रहें।',
    chat: 'AI सहायक से चैट करें',
    account: 'खाता विवरण',
    balance: 'उपलब्ध राशि',
    send: 'भेजें',
    request: 'अनुरोध',
    addMoney: 'पैसे जोड़ें',
    spending: 'खर्च का विवरण',
    thisMonth: 'इस महीने',
    shoppingCategory: 'खरीदारी',
    food: 'खाना और भोजन',
    transport: 'यातायात',
    subscriptions: 'सदस्यताएँ',
    others: 'अन्य',
    recent: 'हाल के लेन-देन',
    viewAll: 'सभी देखें',
    insights: 'AI सुझाव',
    shoppingInsight: 'इस महीने आपने खरीदारी पर अधिक खर्च किया।',
    shoppingAdvice: 'पैसे बचाने के लिए बजट बनाएँ।',
    savingsInsight: 'सदस्यताओं पर पैसे बचाए जा सकते हैं।',
    fraudInsight: 'डेमो डेटा में संदिग्ध भुगतान मिला।',
    safe: 'डेमो खाता',
    connected: 'डेमो मोड',
    language: 'भाषा और क्षेत्र',
    selectLanguage: 'अपनी पसंदीदा भाषा चुनें',
    save: 'आपकी पसंद अपने आप सहेजी जाएगी।',
    search: 'लेन-देन खोजें या AI से पूछें...',
    greeting: 'नमस्ते! मैं PayPilot AI हूँ',
    assistantDesc: 'मैं बजट, खरीदारी, खर्च विश्लेषण और भुगतान सुरक्षा में मदद कर सकता हूँ।',
    message: 'अपना संदेश लिखें...',
    newChat: 'नई चैट',
    quickActions: 'त्वरित कार्य',
    split: 'खर्च बाँटें',
    invoice: 'इनवॉइस बनाएँ',
    budget: 'मासिक बजट',
    fraudTitle: 'धोखाधड़ी पहचान',
    fraudDesc: 'संदिग्ध लेन-देन की जाँच करें।',
    shoppingTitle: 'स्मार्ट शॉपिंग',
    shoppingDesc: 'उत्पादों की तुलना करें और खरीदारी की योजना बनाएँ।',
    financeTitle: 'व्यक्तिगत वित्त',
    financeDesc: 'अपने खर्च को समझें और बजट बनाएँ।',
    groupTitle: 'समूह खर्च',
    groupDesc: 'दोस्तों के साथ साझा खर्च प्रबंधित करें।',
    businessTitle: 'व्यावसायिक टूल',
    businessDesc: 'इनवॉइस और व्यावसायिक वित्त प्रबंधित करें।',
    transactionsTitle: 'लेन-देन का इतिहास',
    allTransactions: 'सभी लेन-देन',
    settingsTitle: 'सेटिंग्स',
    appearance: 'दिखावट',
    darkMode: 'डार्क मोड',
    darkDescription: 'डार्क थीम का उपयोग करें।',
    preferences: 'प्राथमिकताएँ',
    privacy: 'गोपनीयता और सुरक्षा',
    demoNotice: 'यह डेमो डेटा है। असली पैसे ट्रांसफर नहीं होते।',
    amount: 'राशि',
    analyze: 'विश्लेषण करें',
    create: 'बनाएँ',
    askAnything: 'अपने वित्त के बारे में कुछ भी पूछें।',
    today: 'आज',
    noMessages: 'PayPilot AI के साथ बातचीत शुरू करें।',
    totalSpent: 'कुल खर्च',
    monthlyBudget: 'मासिक बजट',
    remaining: 'बाकी',
    budgetHelp: 'पैसे सँभालने के लिए खर्च की सीमा तय करें।',
    groupHelp: 'खर्च को बराबर बाँटने के लिए राशि दर्ज करें।',
    people: 'लोगों की संख्या',
    splitResult: 'प्रत्येक व्यक्ति का हिस्सा',
    invoiceHelp: 'डेमो इनवॉइस बनाएँ।',
    customer: 'ग्राहक का नाम',
    description: 'विवरण',
    dueDate: 'अंतिम तिथि',
    generate: 'बनाएँ',
    invoiceCreated: 'डेमो इनवॉइस सफलतापूर्वक बनाया गया।',
    safePayment: 'भुगतान सुरक्षा सुझाव',
    safety1: 'अपना पासवर्ड या OTP साझा न करें।',
    safety2: 'भुगतान से पहले प्राप्तकर्ता की जाँच करें।',
    safety3: 'अपरिचित लेन-देन की तुरंत जाँच करें।',
    noRealAccount: 'कोई वास्तविक वित्तीय खाता जुड़ा नहीं है।',
    searchResults: 'खोज परिणाम',
    noResults: 'कोई मेल खाता लेन-देन नहीं मिला।',
    languageChanged: 'भाषा सफलतापूर्वक बदल दी गई।',
    welcomeBack: 'वापस स्वागत है!',
    dashboard: 'डैशबोर्ड',
    paymentReceived: 'जॉन से भुगतान',
    amazon: 'अमेज़न',
    starbucks: 'स्टारबक्स',
    spotify: 'स्पॉटिफाई',
    netflix: 'नेटफ्लिक्स',
    friend: 'दोस्त',
    transactionDate: 'तारीख',
    category: 'श्रेणी',
    status: 'स्थिति',
    completed: 'पूरा हुआ',
    featureUnavailable: 'यह डेमो सुविधा है। कोई वास्तविक लेन-देन नहीं होगा।',
  },

  te: {
    home: 'హోమ్',
    assistant: 'AI సహాయకుడు',
    shopping: 'షాపింగ్ సహాయకుడు',
    finance: 'ఆర్థిక వ్యవహారాలు మరియు బడ్జెట్',
    fraud: 'మోసం గుర్తింపు',
    groups: 'గ్రూప్ ఖర్చులు',
    business: 'వ్యాపార సాధనాలు',
    transactions: 'లావాదేవీలు',
    settings: 'సెట్టింగ్‌లు',
    welcome: 'మీ AI ఆధారిత చెల్లింపులు మరియు ఆర్థిక సహాయకుడు',
    subtitle: 'తెలివిగా కొనండి, డబ్బు ఆదా చేయండి, సురక్షితంగా ఉండండి.',
    chat: 'AI సహాయకుడితో చాట్ చేయండి',
    account: 'ఖాతా వివరాలు',
    balance: 'అందుబాటులో ఉన్న మొత్తం',
    send: 'పంపండి',
    request: 'అభ్యర్థించండి',
    addMoney: 'డబ్బు జోడించండి',
    spending: 'ఖర్చుల వివరాలు',
    thisMonth: 'ఈ నెల',
    shoppingCategory: 'షాపింగ్',
    food: 'ఆహారం మరియు భోజనం',
    transport: 'రవాణా',
    subscriptions: 'సబ్‌స్క్రిప్షన్‌లు',
    others: 'ఇతరాలు',
    recent: 'ఇటీవలి లావాదేవీలు',
    viewAll: 'అన్నీ చూడండి',
    insights: 'AI సూచనలు',
    shoppingInsight: 'ఈ నెల మీరు షాపింగ్‌పై ఎక్కువ ఖర్చు చేశారు.',
    shoppingAdvice: 'డబ్బు ఆదా చేయడానికి బడ్జెట్ రూపొందించండి.',
    savingsInsight: 'సబ్‌స్క్రిప్షన్‌లపై డబ్బు ఆదా చేయవచ్చు.',
    fraudInsight: 'డెమో డేటాలో అనుమానాస్పద చెల్లింపు గుర్తించబడింది.',
    safe: 'డెమో ఖాతా',
    connected: 'డెమో మోడ్',
    language: 'భాష మరియు ప్రాంతం',
    selectLanguage: 'మీకు నచ్చిన భాషను ఎంచుకోండి',
    save: 'మీ ఎంపిక ఆటోమేటిక్‌గా సేవ్ అవుతుంది.',
    search: 'లావాదేవీలను వెతకండి లేదా AIని అడగండి...',
    greeting: 'నమస్కారం! నేను PayPilot AI',
    assistantDesc: 'బడ్జెట్, షాపింగ్, ఖర్చుల విశ్లేషణ మరియు చెల్లింపు భద్రతలో సహాయం చేస్తాను.',
    message: 'మీ సందేశాన్ని టైప్ చేయండి...',
    newChat: 'కొత్త చాట్',
    quickActions: 'త్వరిత చర్యలు',
    split: 'ఖర్చును పంచుకోండి',
    invoice: 'ఇన్‌వాయిస్ సృష్టించండి',
    budget: 'నెలవారీ బడ్జెట్',
    fraudTitle: 'మోసం గుర్తింపు',
    fraudDesc: 'అనుమానాస్పద లావాదేవీలను పరిశీలించండి.',
    shoppingTitle: 'స్మార్ట్ షాపింగ్',
    shoppingDesc: 'ఉత్పత్తులను పోల్చి కొనుగోళ్లను ప్లాన్ చేయండి.',
    financeTitle: 'వ్యక్తిగత ఆర్థిక వ్యవహారాలు',
    financeDesc: 'మీ ఖర్చులను అర్థం చేసుకొని బడ్జెట్ రూపొందించండి.',
    groupTitle: 'గ్రూప్ ఖర్చులు',
    groupDesc: 'స్నేహితులతో పంచుకున్న ఖర్చులను నిర్వహించండి.',
    businessTitle: 'వ్యాపార సాధనాలు',
    businessDesc: 'ఇన్‌వాయిస్‌లు మరియు వ్యాపార ఆర్థిక వ్యవహారాలను నిర్వహించండి.',
    transactionsTitle: 'లావాదేవీల చరిత్ర',
    allTransactions: 'అన్ని లావాదేవీలు',
    settingsTitle: 'సెట్టింగ్‌లు',
    appearance: 'రూపం',
    darkMode: 'డార్క్ మోడ్',
    darkDescription: 'డార్క్ రూపాన్ని ఉపయోగించండి.',
    preferences: 'ప్రాధాన్యతలు',
    privacy: 'గోప్యత మరియు భద్రత',
    demoNotice: 'ఇది డెమో డేటా. నిజమైన డబ్బు బదిలీ చేయబడదు.',
    amount: 'మొత్తం',
    analyze: 'విశ్లేషించండి',
    create: 'సృష్టించండి',
    askAnything: 'మీ ఆర్థిక విషయాల గురించి ఏదైనా అడగండి.',
    today: 'ఈరోజు',
    noMessages: 'PayPilot AIతో సంభాషణ ప్రారంభించండి.',
    totalSpent: 'మొత్తం ఖర్చు',
    monthlyBudget: 'నెలవారీ బడ్జెట్',
    remaining: 'మిగిలిన మొత్తం',
    budgetHelp: 'డబ్బును నిర్వహించడానికి ఖర్చు పరిమితిని సెట్ చేయండి.',
    groupHelp: 'ఖర్చును సమానంగా పంచుకోవడానికి మొత్తాన్ని నమోదు చేయండి.',
    people: 'వ్యక్తుల సంఖ్య',
    splitResult: 'ప్రతి వ్యక్తి చెల్లించాల్సిన మొత్తం',
    invoiceHelp: 'డెమో ఇన్‌వాయిస్ సృష్టించండి.',
    customer: 'కస్టమర్ పేరు',
    description: 'వివరణ',
    dueDate: 'గడువు తేదీ',
    generate: 'సృష్టించండి',
    invoiceCreated: 'డెమో ఇన్‌వాయిస్ విజయవంతంగా సృష్టించబడింది.',
    safePayment: 'చెల్లింపు భద్రతా సూచనలు',
    safety1: 'మీ పాస్‌వర్డ్ లేదా OTPని పంచుకోవద్దు.',
    safety2: 'చెల్లించే ముందు గ్రహీతను తనిఖీ చేయండి.',
    safety3: 'తెలియని లావాదేవీలను వెంటనే పరిశీలించండి.',
    noRealAccount: 'నిజమైన ఆర్థిక ఖాతా కనెక్ట్ కాలేదు.',
    searchResults: 'శోధన ఫలితాలు',
    noResults: 'సరిపోలే లావాదేవీలు లేవు.',
    languageChanged: 'భాష విజయవంతంగా మార్చబడింది.',
    welcomeBack: 'తిరిగి స్వాగతం!',
    dashboard: 'డ్యాష్‌బోర్డ్',
    paymentReceived: 'జాన్ నుండి చెల్లింపు',
    amazon: 'అమెజాన్',
    starbucks: 'స్టార్‌బక్స్',
    spotify: 'స్పాటిఫై',
    netflix: 'నెట్‌ఫ్లిక్స్',
    friend: 'స్నేహితులు',
    transactionDate: 'తేదీ',
    category: 'వర్గం',
    status: 'స్థితి',
    completed: 'పూర్తయింది',
    featureUnavailable: 'ఇది డెమో ఫీచర్. నిజమైన లావాదేవీ జరగదు.',
  },

  ta: {
    home: 'முகப்பு',
    assistant: 'AI உதவியாளர்',
    shopping: 'ஷாப்பிங் உதவியாளர்',
    finance: 'நிதி மற்றும் பட்ஜெட்',
    fraud: 'மோசடி கண்டறிதல்',
    groups: 'குழு செலவுகள்',
    business: 'வணிகக் கருவிகள்',
    transactions: 'பரிவர்த்தனைகள்',
    settings: 'அமைப்புகள்',
    welcome: 'உங்கள் AI சார்ந்த பணம் செலுத்தும் மற்றும் நிதி உதவியாளர்',
    subtitle: 'புத்திசாலித்தனமாக வாங்குங்கள், பணத்தைச் சேமியுங்கள், பாதுகாப்பாக இருங்கள்.',
    chat: 'AI உதவியாளருடன் உரையாடுங்கள்',
    account: 'கணக்கு விவரங்கள்',
    balance: 'கிடைக்கும் இருப்பு',
    send: 'அனுப்பு',
    request: 'கோரிக்கை',
    addMoney: 'பணம் சேர்க்கவும்',
    spending: 'செலவு விவரங்கள்',
    thisMonth: 'இந்த மாதம்',
    shoppingCategory: 'ஷாப்பிங்',
    food: 'உணவு மற்றும் உணவகம்',
    transport: 'போக்குவரத்து',
    subscriptions: 'சந்தாக்கள்',
    others: 'மற்றவை',
    recent: 'சமீபத்திய பரிவர்த்தனைகள்',
    viewAll: 'அனைத்தையும் காண்க',
    insights: 'AI ஆலோசனைகள்',
    shoppingInsight: 'இந்த மாதம் ஷாப்பிங்கிற்கு அதிகம் செலவிட்டுள்ளீர்கள்.',
    shoppingAdvice: 'பணத்தைச் சேமிக்க பட்ஜெட் அமைக்கவும்.',
    savingsInsight: 'சந்தாக்களில் பணத்தைச் சேமிக்கலாம்.',
    fraudInsight: 'டெமோ தரவில் சந்தேகத்திற்குரிய கட்டணம் கண்டறியப்பட்டது.',
    safe: 'டெமோ கணக்கு',
    connected: 'டெமோ பயன்முறை',
    language: 'மொழி மற்றும் பகுதி',
    selectLanguage: 'உங்களுக்கு விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்',
    save: 'உங்கள் விருப்பம் தானாகச் சேமிக்கப்படும்.',
    search: 'பரிவர்த்தனைகளைத் தேடவும் அல்லது AI-யிடம் கேட்கவும்...',
    greeting: 'வணக்கம்! நான் PayPilot AI',
    assistantDesc: 'பட்ஜெட், ஷாப்பிங், செலவு பகுப்பாய்வு மற்றும் கட்டணப் பாதுகாப்பில் உதவுவேன்.',
    message: 'உங்கள் செய்தியை உள்ளிடவும்...',
    newChat: 'புதிய உரையாடல்',
    quickActions: 'விரைவான செயல்கள்',
    split: 'செலவைப் பகிரவும்',
    invoice: 'விலைப்பட்டியல் உருவாக்கவும்',
    budget: 'மாதாந்திர பட்ஜெட்',
    fraudTitle: 'மோசடி கண்டறிதல்',
    fraudDesc: 'சந்தேகத்திற்குரிய பரிவர்த்தனைகளைச் சரிபார்க்கவும்.',
    shoppingTitle: 'ஸ்மார்ட் ஷாப்பிங்',
    shoppingDesc: 'பொருட்களை ஒப்பிட்டு வாங்குதலைத் திட்டமிடவும்.',
    financeTitle: 'தனிப்பட்ட நிதி',
    financeDesc: 'செலவுகளைப் புரிந்துகொண்டு பட்ஜெட் அமைக்கவும்.',
    groupTitle: 'குழு செலவுகள்',
    groupDesc: 'நண்பர்களுடன் பகிரப்பட்ட செலவுகளை நிர்வகிக்கவும்.',
    businessTitle: 'வணிகக் கருவிகள்',
    businessDesc: 'விலைப்பட்டியல் மற்றும் வணிக நிதியை நிர்வகிக்கவும்.',
    transactionsTitle: 'பரிவர்த்தனை வரலாறு',
    allTransactions: 'அனைத்து பரிவர்த்தனைகள்',
    settingsTitle: 'அமைப்புகள்',
    appearance: 'தோற்றம்',
    darkMode: 'இருண்ட பயன்முறை',
    darkDescription: 'இருண்ட தோற்றத்தைப் பயன்படுத்தவும்.',
    preferences: 'விருப்பங்கள்',
    privacy: 'தனியுரிமை மற்றும் பாதுகாப்பு',
    demoNotice: 'இது டெமோ தரவு. உண்மையான பணம் மாற்றப்படாது.',
    amount: 'தொகை',
    analyze: 'பகுப்பாய்வு',
    create: 'உருவாக்கவும்',
    askAnything: 'உங்கள் நிதி குறித்து எதையும் கேளுங்கள்.',
    today: 'இன்று',
    noMessages: 'PayPilot AI உடன் உரையாடலைத் தொடங்கவும்.',
    totalSpent: 'மொத்த செலவு',
    monthlyBudget: 'மாதாந்திர பட்ஜெட்',
    remaining: 'மீதமுள்ளது',
    budgetHelp: 'பணத்தை நிர்வகிக்க செலவு வரம்பை அமைக்கவும்.',
    groupHelp: 'செலவை சமமாகப் பிரிக்க தொகையை உள்ளிடவும்.',
    people: 'நபர்களின் எண்ணிக்கை',
    splitResult: 'ஒவ்வொருவரின் பங்கு',
    invoiceHelp: 'டெமோ விலைப்பட்டியல் உருவாக்கவும்.',
    customer: 'வாடிக்கையாளர் பெயர்',
    description: 'விளக்கம்',
    dueDate: 'கடைசி தேதி',
    generate: 'உருவாக்கவும்',
    invoiceCreated: 'டெமோ விலைப்பட்டியல் வெற்றிகரமாக உருவாக்கப்பட்டது.',
    safePayment: 'கட்டணப் பாதுகாப்பு குறிப்புகள்',
    safety1: 'உங்கள் கடவுச்சொல் அல்லது OTP-ஐப் பகிர வேண்டாம்.',
    safety2: 'பணம் செலுத்துவதற்கு முன் பெறுநரைச் சரிபார்க்கவும்.',
    safety3: 'தெரியாத பரிவர்த்தனைகளை உடனே சரிபார்க்கவும்.',
    noRealAccount: 'உண்மையான நிதிக் கணக்கு இணைக்கப்படவில்லை.',
    searchResults: 'தேடல் முடிவுகள்',
    noResults: 'பொருந்தும் பரிவர்த்தனைகள் இல்லை.',
    languageChanged: 'மொழி வெற்றிகரமாக மாற்றப்பட்டது.',
    welcomeBack: 'மீண்டும் வரவேற்கிறோம்!',
    dashboard: 'டாஷ்போர்டு',
    paymentReceived: 'ஜானிடமிருந்து பணம்',
    amazon: 'அமேசான்',
    starbucks: 'ஸ்டார்பக்ஸ்',
    spotify: 'ஸ்பாட்டிஃபை',
    netflix: 'நெட்ஃபிக்ஸ்',
    friend: 'நண்பர்கள்',
    transactionDate: 'தேதி',
    category: 'வகை',
    status: 'நிலை',
    completed: 'முடிந்தது',
    featureUnavailable: 'இது டெமோ வசதி. உண்மையான பரிவர்த்தனை நடைபெறாது.',
  },

  ml: {
    home: 'ഹോം',
    assistant: 'AI സഹായി',
    shopping: 'ഷോപ്പിംഗ് സഹായി',
    finance: 'ധനകാര്യവും ബജറ്റും',
    fraud: 'തട്ടിപ്പ് കണ്ടെത്തൽ',
    groups: 'ഗ്രൂപ്പ് ചെലവുകൾ',
    business: 'ബിസിനസ് ഉപകരണങ്ങൾ',
    transactions: 'ഇടപാടുകൾ',
    settings: 'ക്രമീകരണങ്ങൾ',
    welcome: 'നിങ്ങളുടെ AI അധിഷ്ഠിത പേയ്‌മെന്റ്, ധനകാര്യ സഹായി',
    subtitle: 'ബുദ്ധിപൂർവ്വം വാങ്ങുക, പണം ലാഭിക്കുക, സുരക്ഷിതരായിരിക്കുക.',
    chat: 'AI സഹായിയുമായി ചാറ്റ് ചെയ്യുക',
    account: 'അക്കൗണ്ട് വിവരങ്ങൾ',
    balance: 'ലഭ്യമായ തുക',
    send: 'അയയ്ക്കുക',
    request: 'അഭ്യർത്ഥിക്കുക',
    addMoney: 'പണം ചേർക്കുക',
    spending: 'ചെലവുകളുടെ അവലോകനം',
    thisMonth: 'ഈ മാസം',
    shoppingCategory: 'ഷോപ്പിംഗ്',
    food: 'ഭക്ഷണവും ഡൈനിംഗും',
    transport: 'ഗതാഗതം',
    subscriptions: 'സബ്‌സ്‌ക്രിപ്ഷനുകൾ',
    others: 'മറ്റുള്ളവ',
    recent: 'സമീപകാല ഇടപാടുകൾ',
    viewAll: 'എല്ലാം കാണുക',
    insights: 'AI നിർദ്ദേശങ്ങൾ',
    shoppingInsight: 'ഈ മാസം ഷോപ്പിംഗിന് കൂടുതൽ ചെലവാക്കി.',
    shoppingAdvice: 'പണം ലാഭിക്കാൻ ബജറ്റ് തയ്യാറാക്കുക.',
    savingsInsight: 'സബ്‌സ്‌ക്രിപ്ഷനുകളിൽ പണം ലാഭിക്കാം.',
    fraudInsight: 'ഡെമോ ഡാറ്റയിൽ സംശയാസ്പദമായ പേയ്‌മെന്റ് കണ്ടെത്തി.',
    safe: 'ഡെമോ അക്കൗണ്ട്',
    connected: 'ഡെമോ മോഡ്',
    language: 'ഭാഷയും പ്രദേശവും',
    selectLanguage: 'നിങ്ങൾക്ക് ഇഷ്ടമുള്ള ഭാഷ തിരഞ്ഞെടുക്കുക',
    save: 'നിങ്ങളുടെ തിരഞ്ഞെടുപ്പ് സ്വയമേവ സംരക്ഷിക്കും.',
    search: 'ഇടപാടുകൾ തിരയുക അല്ലെങ്കിൽ AI-യോട് ചോദിക്കുക...',
    greeting: 'നമസ്കാരം! ഞാൻ PayPilot AI',
    assistantDesc: 'ബജറ്റ്, ഷോപ്പിംഗ്, ചെലവ് വിശകലനം, പേയ്‌മെന്റ് സുരക്ഷ എന്നിവയിൽ സഹായിക്കാം.',
    message: 'നിങ്ങളുടെ സന്ദേശം ടൈപ്പ് ചെയ്യുക...',
    newChat: 'പുതിയ ചാറ്റ്',
    quickActions: 'ദ്രുത പ്രവർത്തനങ്ങൾ',
    split: 'ചെലവ് പങ്കിടുക',
    invoice: 'ഇൻവോയ്സ് സൃഷ്ടിക്കുക',
    budget: 'പ്രതിമാസ ബജറ്റ്',
    fraudTitle: 'തട്ടിപ്പ് കണ്ടെത്തൽ',
    fraudDesc: 'സംശയാസ്പദമായ ഇടപാടുകൾ പരിശോധിക്കുക.',
    shoppingTitle: 'സ്മാർട്ട് ഷോപ്പിംഗ്',
    shoppingDesc: 'ഉൽപ്പന്നങ്ങൾ താരതമ്യം ചെയ്ത് വാങ്ങലുകൾ ആസൂത്രണം ചെയ്യുക.',
    financeTitle: 'വ്യക്തിഗത ധനകാര്യം',
    financeDesc: 'ചെലവുകൾ മനസ്സിലാക്കി ബജറ്റ് തയ്യാറാക്കുക.',
    groupTitle: 'ഗ്രൂപ്പ് ചെലവുകൾ',
    groupDesc: 'സുഹൃത്തുക്കളുമായി പങ്കിട്ട ചെലവുകൾ കൈകാര്യം ചെയ്യുക.',
    businessTitle: 'ബിസിനസ് ഉപകരണങ്ങൾ',
    businessDesc: 'ഇൻവോയ്സുകളും ബിസിനസ് ധനകാര്യവും കൈകാര്യം ചെയ്യുക.',
    transactionsTitle: 'ഇടപാട് ചരിത്രം',
    allTransactions: 'എല്ലാ ഇടപാടുകളും',
    settingsTitle: 'ക്രമീകരണങ്ങൾ',
    appearance: 'രൂപഭാവം',
    darkMode: 'ഡാർക്ക് മോഡ്',
    darkDescription: 'ഡാർക്ക് രൂപം ഉപയോഗിക്കുക.',
    preferences: 'മുൻഗണനകൾ',
    privacy: 'സ്വകാര്യതയും സുരക്ഷയും',
    demoNotice: 'ഇത് ഡെമോ ഡാറ്റയാണ്. യഥാർത്ഥ പണം കൈമാറ്റം ചെയ്യില്ല.',
    amount: 'തുക',
    analyze: 'വിശകലനം ചെയ്യുക',
    create: 'സൃഷ്ടിക്കുക',
    askAnything: 'നിങ്ങളുടെ ധനകാര്യത്തെക്കുറിച്ച് എന്തും ചോദിക്കാം.',
    today: 'ഇന്ന്',
    noMessages: 'PayPilot AI-യുമായി സംഭാഷണം ആരംഭിക്കുക.',
    totalSpent: 'ആകെ ചെലവ്',
    monthlyBudget: 'പ്രതിമാസ ബജറ്റ്',
    remaining: 'ബാക്കി',
    budgetHelp: 'പണം നിയന്ത്രിക്കാൻ ചെലവ് പരിധി നിശ്ചയിക്കുക.',
    groupHelp: 'ചെലവ് തുല്യമായി പങ്കിടാൻ തുക നൽകുക.',
    people: 'ആളുകളുടെ എണ്ണം',
    splitResult: 'ഓരോരുത്തരുടെയും വിഹിതം',
    invoiceHelp: 'ഡെമോ ഇൻവോയ്സ് സൃഷ്ടിക്കുക.',
    customer: 'ഉപഭോക്താവിന്റെ പേര്',
    description: 'വിവരണം',
    dueDate: 'അവസാന തീയതി',
    generate: 'സൃഷ്ടിക്കുക',
    invoiceCreated: 'ഡെമോ ഇൻവോയ്സ് വിജയകരമായി സൃഷ്ടിച്ചു.',
    safePayment: 'പേയ്‌മെന്റ് സുരക്ഷാ നിർദ്ദേശങ്ങൾ',
    safety1: 'നിങ്ങളുടെ പാസ്‌വേഡോ OTP-യോ പങ്കിടരുത്.',
    safety2: 'പണം അയയ്ക്കുന്നതിന് മുമ്പ് സ്വീകർത്താവിനെ പരിശോധിക്കുക.',
    safety3: 'അപരിചിത ഇടപാടുകൾ ഉടൻ പരിശോധിക്കുക.',
    noRealAccount: 'യഥാർത്ഥ ധനകാര്യ അക്കൗണ്ട് ബന്ധിപ്പിച്ചിട്ടില്ല.',
    searchResults: 'തിരയൽ ഫലങ്ങൾ',
    noResults: 'പൊരുത്തപ്പെടുന്ന ഇടപാടുകളില്ല.',
    languageChanged: 'ഭാഷ വിജയകരമായി മാറ്റി.',
    welcomeBack: 'വീണ്ടും സ്വാഗതം!',
    dashboard: 'ഡാഷ്ബോർഡ്',
    paymentReceived: 'ജോണിൽ നിന്നുള്ള പേയ്‌മെന്റ്',
    amazon: 'ആമസോൺ',
    starbucks: 'സ്റ്റാർബക്സ്',
    spotify: 'സ്പോട്ടിഫൈ',
    netflix: 'നെറ്റ്ഫ്ലിക്സ്',
    friend: 'സുഹൃത്തുക്കൾ',
    transactionDate: 'തീയതി',
    category: 'വിഭാഗം',
    status: 'നില',
    completed: 'പൂർത്തിയായി',
    featureUnavailable: 'ഇത് ഡെമോ സൗകര്യമാണ്. യഥാർത്ഥ ഇടപാട് നടക്കില്ല.',
  },
};

const languageOptions: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'ml', label: 'മലയാളം' },
];

const navItems: { page: Page; key: string; icon: string }[] = [
  { page: 'Home', key: 'home', icon: '⌂' },
  { page: 'AI Assistant', key: 'assistant', icon: '✦' },
  { page: 'Shopping Assistant', key: 'shopping', icon: '🛒' },
  { page: 'Finance & Budget', key: 'finance', icon: '▥' },
  { page: 'Fraud Detector', key: 'fraud', icon: '⬡' },
  { page: 'Group Expenses', key: 'groups', icon: '♧' },
  { page: 'Business Tools', key: 'business', icon: '▣' },
  { page: 'Transactions', key: 'transactions', icon: '⇄' },
  { page: 'Settings', key: 'settings', icon: '⚙' },
];

const transactions = [
  { name: 'Amazon', key: 'amazon', category: 'shoppingCategory', date: 'Oct 15, 2026', amount: -59.99, icon: 'a', color: 'orange' },
  { name: 'Starbucks', key: 'starbucks', category: 'food', date: 'Oct 14, 2026', amount: -4.50, icon: '☕', color: 'green' },
  { name: 'Spotify', key: 'spotify', category: 'subscriptions', date: 'Oct 12, 2026', amount: -9.99, icon: '♫', color: 'lime' },
  { name: 'Payment from John', key: 'paymentReceived', category: 'friend', date: 'Oct 10, 2026', amount: 50.00, icon: 'J', color: 'purple' },
  { name: 'Netflix', key: 'netflix', category: 'subscriptions', date: 'Oct 08, 2026', amount: -15.99, icon: 'N', color: 'red' },
];

const spending = [
  { key: 'shoppingCategory', value: 35, color: '#3985ff' },
  { key: 'food', value: 20, color: '#a855f7' },
  { key: 'transport', value: 15, color: '#ff557d' },
  { key: 'subscriptions', value: 10, color: '#ffc02f' },
  { key: 'others', value: 20, color: '#22d39b' },
];

function App() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('paypilot-language');
    return languageOptions.some((item) => item.code === saved)
      ? (saved as Language)
      : 'en';
  });

  const [activePage, setActivePage] = useState<Page>('Home');
  const [darkMode, setDarkMode] = useState(true);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<
    { sender: 'user' | 'ai'; text: string }[]
  >([]);
  const [toast, setToast] = useState('');
  const [budget, setBudget] = useState('1500');
  const [splitAmount, setSplitAmount] = useState('120');
  const [people, setPeople] = useState('4');
  const [customer, setCustomer] = useState('');
  const [invoiceAmount, setInvoiceAmount] = useState('100');
  const [invoiceDescription, setInvoiceDescription] = useState('');
  const [showBalance, setShowBalance] = useState(true);

  const t = (key: string) => translations[language][key] ?? translations.en[key] ?? key;

  useEffect(() => {
    localStorage.setItem('paypilot-language', language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(''), 3000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const changeLanguage = (value: string) => {
    setLanguage(value as Language);
    setToast(translations[value as Language].languageChanged);
  };

  const goTo = (page: Page) => {
    setActivePage(page);
    setSearch('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const visibleTransactions = transactions.filter((item) => {
    const text = `${item.name} ${item.category} ${item.date}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  const sendMessage = () => {
    const text = message.trim();
    if (!text) return;

    setChatMessages((previous) => [
      ...previous,
      { sender: 'user', text },
    ]);
    setMessage('');

    window.setTimeout(() => {
      const reply = getDemoReply(text, t);
      setChatMessages((previous) => [
        ...previous,
        { sender: 'ai', text: reply },
      ]);
    }, 450);
  };

  const currency = (value: number) =>
    new Intl.NumberFormat(language === 'en' ? 'en-US' : language, {
      style: 'currency',
      currency: 'USD',
    }).format(value);

  return (
    <div className={`app-shell ${darkMode ? 'dark' : 'light'}`}>
      <header className="topbar">
        <button className="brand" onClick={() => goTo('Home')} aria-label="PayPilot AI Home">
          <span className="brand-mark">P</span>
          <span>PayPilot <b>AI</b></span>
        </button>

        <div className="top-search">
          <span>⌕</span>
          <input
            aria-label="Search transactions"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              if (event.target.value) setActivePage('Transactions');
            }}
            placeholder={t('search')}
          />
          {search && (
            <button onClick={() => setSearch('')} aria-label="Clear search">×</button>
          )}
        </div>

        <div className="top-actions">
          <button
            className="icon-button notification-button"
            onClick={() => setToast(t('demoNotice'))}
            aria-label="Notifications"
          >
            ♧<span className="notification-dot" />
          </button>
          <div className="profile-chip">
            <span className="profile-avatar">G</span>
            <span>{t('safe')}</span>
          </div>
        </div>
      </header>

      <div className="app-body">
        <aside className="sidebar">
          <div className="sidebar-label">{t('dashboard')}</div>
          <nav className="side-nav">
            {navItems.map((item) => (
              <button
                key={item.page}
                className={`nav-item ${activePage === item.page ? 'active' : ''}`}
                onClick={() => goTo(item.page)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{t(item.key)}</span>
              </button>
            ))}
          </nav>

          <div className="sidebar-account">
            <div className="account-mini-logo">P</div>
            <div>
              <strong>PayPilot</strong>
              <p>{t('connected')}</p>
            </div>
            <span className="status-dot" />
          </div>

          <div className="sidebar-demo">{t('demoNotice')}</div>
        </aside>

        <main className="main-content">
          {activePage === 'Home' && (
            <HomePage
              t={t}
              currency={currency}
              showBalance={showBalance}
              setShowBalance={setShowBalance}
              goTo={goTo}
            />
          )}

          {activePage === 'AI Assistant' && (
            <section className="page-section">
              <PageHeading title={t('assistant')} subtitle={t('assistantDesc')} />
              <div className="chat-panel">
                <div className="chat-welcome">
                  <div className="bot-avatar">✦</div>
                  <h2>{t('greeting')}</h2>
                  <p>{t('askAnything')}</p>
                </div>
                <div className="chat-messages">
                  {chatMessages.length === 0 && (
                    <div className="empty-chat">{t('noMessages')}</div>
                  )}
                  {chatMessages.map((item, index) => (
                    <div key={index} className={`chat-message ${item.sender}`}>
                      {item.text}
                    </div>
                  ))}
                </div>
                <form
                  className="chat-input-row"
                  onSubmit={(event) => {
                    event.preventDefault();
                    sendMessage();
                  }}
                >
                  <input
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder={t('message')}
                  />
                  <button className="primary-button send-chat" type="submit">➤</button>
                </form>
                <p className="demo-note">{t('demoNotice')}</p>
              </div>
            </section>
          )}

          {activePage === 'Shopping Assistant' && (
            <FeaturePage
              icon="🛒"
              title={t('shoppingTitle')}
              description={t('shoppingDesc')}
              t={t}
              onAction={() => setToast(t('featureUnavailable'))}
              action={t('analyze')}
            >
              <div className="info-card">
                <h3>{t('shoppingTitle')}</h3>
                <p>{t('shoppingDesc')}</p>
                <p className="muted">{t('featureUnavailable')}</p>
              </div>
            </FeaturePage>
          )}

          {activePage === 'Finance & Budget' && (
            <section className="page-section">
              <PageHeading title={t('financeTitle')} subtitle={t('financeDesc')} />
              <div className="panel form-panel">
                <label htmlFor="budget">{t('monthlyBudget')} ($)</label>
                <input id="budget" type="number" min="0" value={budget}
                  onChange={(event) => setBudget(event.target.value)} />
                <div className="budget-summary">
                  <div><span>{t('totalSpent')}</span><strong>$892.00</strong></div>
                  <div><span>{t('remaining')}</span><strong>{currency(Math.max(0, Number(budget) - 892))}</strong></div>
                </div>
                <p className="muted">{t('budgetHelp')}</p>
                <div className="progress-track">
                  <div className="progress-value" style={{ width: `${Math.min(100, (892 / Math.max(1, Number(budget))) * 100)}%` }} />
                </div>
              </div>
              <div className="panel">
                <h3>{t('insights')}</h3>
                <p>{t('shoppingAdvice')}</p>
              </div>
            </section>
          )}

          {activePage === 'Fraud Detector' && (
            <section className="page-section">
              <PageHeading title={t('fraudTitle')} subtitle={t('fraudDesc')} />
              <div className="alert-card">
                <span className="alert-symbol">!</span>
                <div>
                  <strong>{t('fraudInsight')}</strong>
                  <p>{t('featureUnavailable')}</p>
                </div>
                <span className="risk-badge">DEMO</span>
              </div>
              <div className="panel">
                <h3>{t('safePayment')}</h3>
                <ul className="safety-list">
                  <li>✓ {t('safety1')}</li>
                  <li>✓ {t('safety2')}</li>
                  <li>✓ {t('safety3')}</li>
                </ul>
              </div>
            </section>
          )}

          {activePage === 'Group Expenses' && (
            <section className="page-section">
              <PageHeading title={t('groupTitle')} subtitle={t('groupDesc')} />
              <div className="panel form-panel">
                <p>{t('groupHelp')}</p>
                <label htmlFor="split-amount">{t('amount')} ($)</label>
                <input id="split-amount" type="number" min="0" value={splitAmount}
                  onChange={(event) => setSplitAmount(event.target.value)} />
                <label htmlFor="people">{t('people')}</label>
                <input id="people" type="number" min="1" value={people}
                  onChange={(event) => setPeople(event.target.value)} />
                <div className="split-result">
                  <span>{t('splitResult')}</span>
                  <strong>{currency(Number(splitAmount) / Math.max(1, Number(people)))}</strong>
                </div>
                <button className="primary-button full-button" onClick={() => setToast(t('featureUnavailable'))}>
                  {t('split')}
                </button>
              </div>
            </section>
          )}

          {activePage === 'Business Tools' && (
            <section className="page-section">
              <PageHeading title={t('businessTitle')} subtitle={t('businessDesc')} />
              <div className="panel form-panel">
                <p>{t('invoiceHelp')}</p>
                <label htmlFor="customer">{t('customer')}</label>
                <input id="customer" value={customer}
                  onChange={(event) => setCustomer(event.target.value)} />
                <label htmlFor="invoice-description">{t('description')}</label>
                <input id="invoice-description" value={invoiceDescription}
                  onChange={(event) => setInvoiceDescription(event.target.value)} />
                <label htmlFor="invoice-amount">{t('amount')} ($)</label>
                <input id="invoice-amount" type="number" min="0" value={invoiceAmount}
                  onChange={(event) => setInvoiceAmount(event.target.value)} />
                <button
                  className="primary-button full-button"
                  onClick={() => setToast(customer.trim() ? t('invoiceCreated') : t('customer'))}
                >
                  {t('generate')}
                </button>
                <p className="muted">{t('demoNotice')}</p>
              </div>
            </section>
          )}

          {activePage === 'Transactions' && (
            <section className="page-section">
              <PageHeading title={t('transactionsTitle')} subtitle={t('allTransactions')} />
              <div className="panel transaction-panel">
                <div className="panel-heading">
                  <h2>{t('allTransactions')}</h2>
                  <span className="muted">{visibleTransactions.length} items</span>
                </div>
                <TransactionList items={visibleTransactions} t={t} currency={currency} />
                {visibleTransactions.length === 0 && (
                  <p className="empty-chat">{t('noResults')}</p>
                )}
                <p className="demo-note">{t('demoNotice')}</p>
              </div>
            </section>
          )}

          {activePage === 'Settings' && (
            <section className="page-section">
              <PageHeading title={t('settingsTitle')} subtitle={t('preferences')} />

              <div className="panel settings-panel">
                <div className="settings-icon">🌍</div>
                <div className="settings-copy">
                  <h3>{t('language')}</h3>
                  <p>{t('selectLanguage')}</p>
                  <select
                    value={language}
                    onChange={(event) => changeLanguage(event.target.value)}
                    aria-label={t('selectLanguage')}
                  >
                    {languageOptions.map((item) => (
                      <option key={item.code} value={item.code}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  <small>{t('save')}</small>
                </div>
              </div>

              <div className="panel settings-panel">
                <div className="settings-icon">{darkMode ? '🌙' : '☀️'}</div>
                <div className="settings-copy">
                  <h3>{t('appearance')}</h3>
                  <p>{t('darkDescription')}</p>
                </div>
                <button
                  className={`toggle ${darkMode ? 'on' : ''}`}
                  role="switch"
                  aria-checked={darkMode}
                  aria-label={t('darkMode')}
                  onClick={() => setDarkMode((previous) => !previous)}
                >
                  <span />
                </button>
              </div>

              <div className="panel">
                <h3>{t('privacy')}</h3>
                <p className="muted">{t('noRealAccount')}</p>
                <p className="demo-note">{t('demoNotice')}</p>
              </div>
            </section>
          )}
        </main>
      </div>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        {([
          { page: 'Home' as Page, key: 'home', icon: '⌂' },
          { page: 'AI Assistant' as Page, key: 'assistant', icon: '✦' },
          { page: 'Finance & Budget' as Page, key: 'finance', icon: '▥' },
          { page: 'Transactions' as Page, key: 'transactions', icon: '⇄' },
          { page: 'Settings' as Page, key: 'settings', icon: '⚙' },
        ]).map((item) => (
          <button
            key={item.page}
            className={activePage === item.page ? 'active' : ''}
            onClick={() => goTo(item.page)}
          >
            <span>{item.icon}</span>
            <small>{t(item.key)}</small>
          </button>
        ))}
      </nav>

      {toast && (
        <div className="toast-message" role="status">
          <span>✓</span> {toast}
          <button onClick={() => setToast('')} aria-label="Dismiss">×</button>
        </div>
      )}
    </div>
  );
}

function HomePage({
  t,
  currency,
  showBalance,
  setShowBalance,
  goTo,
}: {
  t: (key: string) => string;
  currency: (value: number) => string;
  showBalance: boolean;
  setShowBalance: (value: boolean) => void;
  goTo: (page: Page) => void;
}) {
  return (
    <div className="dashboard-page">
      <section className="hero-banner">
        <div className="hero-copy">
          <span className="eyebrow">PAYPILOT AI · SMART FINANCE</span>
          <h1>{t('welcome')}</h1>
          <p>{t('subtitle')}</p>
          <button className="primary-button hero-button" onClick={() => goTo('AI Assistant')}>
            {t('chat')} <span>→</span>
          </button>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-robot">🤖</div>
          <span className="float-icon cart-float">🛒</span>
          <span className="float-icon shield-float">🛡️</span>
          <span className="float-icon chart-float">▥</span>
        </div>
      </section>

      <section className="overview-grid">
        <div className="panel account-panel">
          <div className="panel-heading">
            <div className="panel-title-with-icon">
              <span className="paypal-mark">P</span>
              <div>
                <h2>{t('account')}</h2>
                <p>{t('safe')}</p>
              </div>
            </div>
            <span className="demo-badge">DEMO</span>
          </div>
          <div className="balance-label">{t('balance')}</div>
          <div className="balance-row">
            <strong>{showBalance ? '$1,234.56' : '••••••••'}</strong>
            <button
              className="icon-button balance-eye"
              onClick={() => setShowBalance(!showBalance)}
              aria-label="Toggle balance visibility"
            >
              {showBalance ? '◉' : '◎'}
            </button>
          </div>
          <p className="balance-change">↗ 12% from last month</p>
          <div className="account-actions">
            <button onClick={() => goTo('Transactions')}>{t('send')}</button>
            <button onClick={() => goTo('Transactions')}>{t('request')}</button>
            <button onClick={() => goTo('Transactions')}>{t('addMoney')}</button>
          </div>
          <p className="demo-note">{t('demoNotice')}</p>
        </div>

        <div className="panel spending-panel">
          <div className="panel-heading">
            <h2>{t('spending')}</h2>
            <span className="period-pill">{t('thisMonth')}⌄</span>
          </div>
          <div className="spending-content">
            <div className="donut-chart">
              <div className="donut-center">
                <strong>$892</strong>
                <span>{t('totalSpent')}</span>
              </div>
            </div>
            <div className="spending-legend">
              {spending.map((item) => (
                <div className="legend-row" key={item.key}>
                  <span className="legend-name">
                    <i style={{ background: item.color }} />
                    {t(item.key)}
                  </span>
                  <strong>{item.value}%</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="lower-grid">
        <div className="panel transaction-panel">
          <div className="panel-heading">
            <h2>{t('recent')}</h2>
            <button className="text-button" onClick={() => goTo('Transactions')}>
              {t('viewAll')} →
            </button>
          </div>
          <TransactionList items={transactions.slice(0, 5)} t={t} currency={currency} />
          <p className="demo-note">{t('demoNotice')}</p>
        </div>

        <div className="panel insights-panel">
          <div className="panel-heading">
            <h2>{t('insights')}</h2>
            <span className="insight-spark">✦</span>
          </div>
          <Insight icon="↗" color="green" title={t('shoppingInsight')} description={t('shoppingAdvice')} />
          <Insight icon="💡" color="yellow" title={t('savingsInsight')} description={t('budgetHelp')} />
          <Insight icon="!" color="red" title={t('fraudInsight')} description={t('featureUnavailable')} />
        </div>
      </section>
    </div>
  );
}

function TransactionList({
  items,
  t,
  currency,
}: {
  items: typeof transactions;
  t: (key: string) => string;
  currency: (value: number) => string;
}) {
  return (
    <div className="transaction-list">
      {items.map((item) => (
        <div className="transaction-row" key={item.name}>
          <span className={`transaction-avatar ${item.color}`}>{item.icon}</span>
          <div className="transaction-info">
            <strong>{t(item.key)}</strong>
            <span>{item.date} · {t(item.category)}</span>
          </div>
          <strong className={`transaction-amount ${item.amount > 0 ? 'positive' : 'negative'}`}>
            {item.amount > 0 ? '+' : '−'}{currency(Math.abs(item.amount))}
          </strong>
        </div>
      ))}
    </div>
  );
}

function Insight({
  icon,
  color,
  title,
  description,
}: {
  icon: string;
  color: string;
  title: string;
  description: string;
}) {
  return (
    <div className="insight-row">
      <span className={`insight-icon ${color}`}>{icon}</span>
      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
      <span className="insight-arrow">›</span>
    </div>
  );
}

function PageHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="page-heading">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}

function FeaturePage({
  icon,
  title,
  description,
  children,
  action,
  onAction,
}: {
  icon: string;
  title: string;
  description: string;
  children: ReactNode;
  action: string;
  onAction: () => void;
}) {
  return (
    <section className="page-section">
      <PageHeading title={title} subtitle={description} />
      <div className="feature-hero-card">
        <span>{icon}</span>
        <h2>{title}</h2>
        <p>{description}</p>
        <button className="primary-button" onClick={onAction}>{action} →</button>
      </div>
      {children}
    </section>
  );
}

function getDemoReply(text: string, t: (key: string) => string) {
  const message = text.toLowerCase();

  if (message.includes('budget') || message.includes('save')) {
    return `${t('budgetHelp')} ${t('shoppingAdvice')}`;
  }

  if (message.includes('fraud') || message.includes('safe') || message.includes('payment')) {
    return `${t('safePayment')}: ${t('safety1')} ${t('safety2')}`;
  }

  if (message.includes('spend') || message.includes('expense')) {
    return `${t('totalSpent')}: $892.00. ${t('shoppingAdvice')}`;
  }

  return `${t('greeting')}! ${t('assistantDesc')} ${t('demoNotice')}`;
}

export default App;