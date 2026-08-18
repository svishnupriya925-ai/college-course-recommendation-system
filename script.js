function recommendCourse() {

    let name = document.getElementById("name").value;
    let rollno = document.getElementById("rollno").value;
    let qualification = document.getElementById("qualification").value;
    let cutoff = parseInt(document.getElementById("cutoff").value);
    let field = document.getElementById("field").value;
    let location = document.getElementById("location").value;

    // Save Student Details
    localStorage.setItem("studentName", name);
    localStorage.setItem("rollno", rollno);
    localStorage.setItem("qualification", qualification);
    localStorage.setItem("cutoff", cutoff);
    localStorage.setItem("field", field);
    localStorage.setItem("location", location);

    // Remove old backend recommendation
    localStorage.removeItem("backendCourse");
    localStorage.removeItem("backendReason");

    // Connect Frontend to Backend
    fetch("http://localhost:5000/recommend", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
    name: name,
    registerNumber: rollno,
    qualification: qualification,
    percentage: cutoff,
    group: qualification,
    interest: field,
    location: location
})
    })
    .then(response => response.json())
    .then(data => {

        // Save Backend Recommendation
        localStorage.setItem("backendCourse", data.course);
        localStorage.setItem("backendReason", data.reason);

        // Open Recommendation Page
        window.location.href = "recommendation.html";
    })
    .catch(error => {
        console.error("Backend Error:", error);
        alert("Backend connection failed. Please start the server.");
    });
}


function loadRecommendedCourses() {

    let qualification = localStorage.getItem("qualification");
    let field = localStorage.getItem("field");
    let cutoff = parseInt(localStorage.getItem("cutoff"));

    let container = document.getElementById("courseContainer");

    if (!container) return;

    let courses = [];

    let backendCourse = localStorage.getItem("backendCourse");
    let backendReason = localStorage.getItem("backendReason");


    // ==========================
    // OLD FRONTEND COURSE LOGIC
    // ==========================

    if (qualification === "12th Science" && field === "Biology") {

        if (cutoff >= 190) {

            courses = [
                ["MBBS", "5.5 Years", "Doctor"],
                ["BDS", "5 Years", "Dentist"],
                ["B.Pharm", "4 Years", "Pharmacist"],
                ["B.Sc Nursing", "4 Years", "Nurse"]
            ];

        } else if (cutoff >= 170) {

            courses = [
                ["B.Pharm", "4 Years", "Pharmacist"],
                ["Biotechnology", "3 Years", "Research Scientist"],
                ["Microbiology", "3 Years", "Microbiologist"],
                ["B.Sc Nursing", "4 Years", "Nurse"]
            ];

        } else {

            courses = [
                ["B.Sc Biotechnology", "3 Years", "Research"],
                ["B.Sc Agriculture", "4 Years", "Agriculture Officer"],
                ["B.Sc Zoology", "3 Years", "Zoologist"],
                ["B.Sc Botany", "3 Years", "Botanist"]
            ];
        }
    }


    else if (
        qualification === "12th Science" &&
        (field === "Computer" || field === "Artificial Intelligence")
    ) {

        if (cutoff >= 170) {

            courses = [
                ["B.Tech CSE", "4 Years", "Software Engineer"],
                ["AI & DS", "4 Years", "AI Engineer"],
                ["B.Sc Computer Science", "3 Years", "Software Developer"],
                ["BCA", "3 Years", "Programmer"]
            ];

        } else {

            courses = [
                ["BCA", "3 Years", "Programmer"],
                ["B.Sc Computer Science", "3 Years", "Developer"],
                ["B.Sc IT", "3 Years", "IT Professional"],
                ["B.Sc Data Science", "3 Years", "Data Analyst"]
            ];
        }
    }


    else if (field === "Data Science") {

        courses = [
            ["B.Sc Data Science", "3 Years", "Data Analyst"],
            ["AI & DS", "4 Years", "AI Engineer"],
            ["B.Sc Statistics", "3 Years", "Statistician"],
            ["BCA", "3 Years", "Software Developer"]
        ];
    }


    else if (field === "Engineering") {

        courses = [
            ["B.Tech CSE", "4 Years", "Software Engineer"],
            ["B.Tech AI & ML", "4 Years", "AI Engineer"],
            ["B.E Mechanical", "4 Years", "Mechanical Engineer"],
            ["B.E Civil", "4 Years", "Civil Engineer"]
        ];
    }


    else if (
        qualification === "12th Commerce" ||
        field === "Commerce" ||
        field === "Business"
    ) {

        courses = [
            ["B.Com", "3 Years", "Accountant"],
            ["BBA", "3 Years", "Business Manager"],
            ["CA", "5 Years", "Chartered Accountant"],
            ["B.Com Finance", "3 Years", "Finance Analyst"]
        ];
    }


    else if (qualification === "12th Arts") {

        courses = [
            ["BA English", "3 Years", "Teacher"],
            ["BA Economics", "3 Years", "Economist"],
            ["Psychology", "3 Years", "Psychologist"],
            ["Journalism", "3 Years", "Journalist"]
        ];
    }


    else if (qualification === "Diploma") {

        courses = [
            ["B.Tech Lateral Entry", "3 Years", "Engineer"],
            ["BCA", "3 Years", "Programmer"],
            ["B.Sc IT", "3 Years", "IT Professional"],
            ["B.Sc Data Science", "3 Years", "Data Analyst"]
        ];
    }


    else {

        courses = [
            ["B.Sc Computer Science", "3 Years", "Software Developer"],
            ["BCA", "3 Years", "Programmer"],
            ["B.Com", "3 Years", "Accountant"],
            ["B.Sc Data Science", "3 Years", "Data Analyst"]
        ];
    }


    // ==========================
    // BACKEND RECOMMENDATION
    // ==========================

    if (backendCourse) {

        let duration = "3 Years";
        let career = "Software Developer";

        if (
            backendCourse === "B.Tech Computer Science Engineering" ||
            backendCourse === "B.Tech CSE"
        ) {
            duration = "4 Years";
            career = "Software Engineer";
        }

        else if (backendCourse === "MBBS") {
            duration = "5.5 Years";
            career = "Doctor";
        }

        else if (backendCourse === "B.Com") {
            duration = "3 Years";
            career = "Accountant";
        }

        else if (backendCourse === "B.A.") {
            duration = "3 Years";
            career = "Teacher";
        }

        else if (backendCourse === "B.Tech Lateral Entry") {
            duration = "3 Years";
            career = "Engineer";
        }

        courses = [
            [backendCourse, duration, career]
        ];
    }


    // ==========================
    // MATCH PERCENTAGE
    // ==========================

    let match = 75;

    if (cutoff >= 190)
        match = 98;
    else if (cutoff >= 180)
        match = 95;
    else if (cutoff >= 170)
        match = 90;
    else if (cutoff >= 160)
        match = 85;


    // ==========================
    // DISPLAY COURSES
    // ==========================

    let html = "";

    courses.forEach(function(course) {

        html += `
        <div class="card">

            <h3>${course[0]}</h3>

            <p>
                <b>Duration:</b> ${course[1]}
            </p>

            <p>
                <b>Career:</b> ${course[2]}
            </p>

            <p>
                <b>Match Percentage:</b> ${match}%
            </p>

            <p>
                <b>Reason:</b> ${backendReason || "Based on your details, this course is recommended."}
            </p>

            <button class="btn" onclick="selectCourse('${course[0]}')">
                View Colleges
            </button>

        </div>
        `;
    });

    container.innerHTML = html;
}


// ==========================
// SELECT COURSE
// ==========================

function selectCourse(courseName) {

    localStorage.setItem("selectedCourse", courseName);

    window.location.href = "colleges.html";
}