function sendMessage() {
    let input = document.getElementById("userInput").value;
    let chatBox = document.getElementById("chatBox");

    if (input.trim() === "") {
        return;
    }

    chatBox.innerHTML += "<p><b>You:</b> " + input + "</p>";

    let message = input.toLowerCase();
    let reply = "";

    if (message.includes("hi") || message.includes("hello")) {
        reply = "Hi 👋 Welcome to EduGuide AI! I can help you choose the right course.";
    }

    else if (message.includes("course") || message.includes("best course")) {
        reply = "Course selection depends on your 12th marks, group and interest. Tell me your group and interest for better suggestions.";
    }

    else if (message.includes("data science")) {
        reply = "B.Sc Data Science is suitable for students interested in Python, AI, Machine Learning and Data Analysis. Career options: Data Analyst, Data Scientist and ML Engineer.";
    }

    else if (message.includes("engineering") || message.includes("b.tech")) {
        reply = "B.Tech courses like Computer Science Engineering are good for students interested in programming and technology.";
    }

    else if (message.includes("science")) {
        reply = "Science students can explore MBBS, Engineering, Data Science, Biotechnology and other technology-related courses.";
    }

    else if (message.includes("commerce")) {
        reply = "Commerce students can choose B.Com, CA, Finance, Business Analytics and Management courses.";
    }

    else if (message.includes("arts")) {
        reply = "Arts students can explore BA, Psychology, Journalism, Design and Management courses.";
    }

    else if (message.includes("90") || message.includes("95") || message.includes("percentage")) {
        reply = "With good percentage, you have more course options. Tell me your group and interest to get a suitable recommendation.";
    }
    else if (message.includes("mbbs")) {
    reply = "MBBS (Bachelor of Medicine and Bachelor of Surgery) is a 5.5-year medical degree including internship. Career: Doctor.";
}

    else if (message.includes("bds")) {
    reply = "BDS (Bachelor of Dental Surgery) is a 5-year undergraduate course to become a Dentist.";
}

    else if (message.includes("b.pharm") || message.includes("pharmacy")) {
    reply = "B.Pharm is a 4-year undergraduate pharmacy course. Career: Pharmacist, Drug Research, Pharmaceutical Industry.";
}

    else if (message.includes("bca")) {
    reply = "BCA is a 3-year undergraduate course that teaches programming, databases and software development.";
}

     else if (message.includes("computer science")) {
    reply = "Computer Science focuses on programming, software development, networking and database management.";
}

    else if (message.includes("salary")) {
    reply = "Salary depends on the career. Example: Data Scientist ₹10-25 LPA, Software Engineer ₹6-15 LPA, Doctor ₹8-30 LPA.";
}

    else if (message.includes("career")) {
        reply = "Career opportunities depend on your chosen course. EduGuide AI helps you find courses with future career scope.";
    }

    else {
        reply = "I can help with courses, groups, Data Science, Engineering and career guidance. Try asking me!";
    }

    chatBox.innerHTML += "<p><b>EduGuide AI:</b> " + reply + "</p>";

    document.getElementById("userInput").value = "";
}