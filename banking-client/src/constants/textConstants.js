const textConstants = {
    notifications: {
        successDeposit: "ההפקדה בוצעה בהצלחה!",
        successEdit: "העריכה נשמרה בהצלחה!",
        successDelete: "ההפקדה נמחקה בהצלחה!",
        errorToken: "הקריאה נכשלה כי לא קיבלנו טוקן מאושר",
        errorBank: "הקריאה נכשלה כי הבנק לא מאשר",
        validationError: "נא למלא את כל השדות הנדרשים בצורה תקינה.",
        withdrawalUserNotFound: "המשתמש לא נמצא, לא ניתן לבצע משיכה.",

    },
    validation: {
        fullNameHebrew: "שם מלא בעברית חייב להיות עד 20 תווים ולכלול רק אותיות עבריות.",
        fullNameEnglish: "שם מלא באנגלית חייב להיות עד 15 תווים ולכלול רק אותיות אנגליות.",
        userId: "תעודת זהות חייבת להכיל בדיוק 9 ספרות.",
        accountNumber: "מספר חשבון חייב להכיל עד 10 ספרות.",
        birthDate: "נא להזין תאריך בפורמט תקין.",
        actionType: "יש לבחור סוג פעולה.",
        amount: "סכום חייב להכיל עד 10 ספרות בלבד.",
    },
    labels: {
        fullNameHebrew: "שם מלא בעברית",
        fullNameEnglish: "שם מלא באנגלית",
        birthDate: "תאריך לידה",
        userId: "תעודת זהות",
        accountNumber: "מספר חשבון",
        amount: "סכום",
        actionType: "סוג פעולה",
        deposit: "הפקדה",
        withdrawal: "משיכה",
        submit: "שלח",
        clear: "נקה טופס",
        transactionsHistory: "היסטוריית הפקדות",
        depositFormTitle: "טופס הפקדה",        
        searchById: "חפש לפי תעודת זהות",
        searchByName: "חפש לפי שם מלא בעברית",
        search: "חפש",
        clearSearch: "נקה",
    }
};

export default textConstants;
