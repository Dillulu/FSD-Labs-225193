/**
 * Full Stack Development (CS-301L) - Lab 05
 * Student Name: Hamza Tahir
 * Registration ID: 225193
 *
 * Question 3: Student Management Frontend using jQuery AJAX
 * - GET /api/students  → Fetch and display all students in table
 * - POST /api/students → Submit new student form via jQuery $.ajax POST
 * - CORS handled transparently by backend cors middleware
 */

$(document).ready(function () {
    const API_BASE = "http://localhost:3005";

    // ─── Status Helper ───────────────────────────────────
    function setStatus(type, icon, msg) {
        $("#status-bar").removeClass("idle loading success error").addClass(type);
        $("#status-icon").text(icon);
        $("#status-msg").text(msg);
    }

    // ─── API Health Check ─────────────────────────────────
    function checkHealth() {
        $.ajax({
            url: API_BASE + "/api/students",
            method: "GET",
            timeout: 4000,
            success: function () {
                $("#health-dot").removeClass("offline").addClass("online");
                $("#health-text").text("Express server online (port 3005)");
            },
            error: function () {
                $("#health-dot").removeClass("online").addClass("offline");
                $("#health-text").text("Server offline – run: node server.js");
            }
        });
    }

    checkHealth();
    $("#btn-check-health").on("click", checkHealth);

    // ─── GET: Load All Students ────────────────────────────
    $("#btn-get-students").on("click", function () {
        setStatus("loading", "⏳", "Sending GET request to Express API...");
        $(this).prop("disabled", true).text("Loading...");
        const $btn = $(this);

        $.ajax({
            url: API_BASE + "/api/students",
            method: "GET",
            dataType: "json",
            timeout: 8000,
            success: function (data) {
                console.log("[GET 200 OK]", data);

                const students = data.students || [];
                $("#student-count-label").text(students.length + " records");

                const $tbody = $("#students-tbody").empty();

                if (students.length === 0) {
                    $tbody.html('<tr class="empty-row"><td colspan="7">No students found.</td></tr>');
                } else {
                    // Build table rows using jQuery $.each
                    $.each(students, function (i, s) {
                        const gradeColor = s.grade === "A+" ? "#15803d" : s.grade === "A" ? "#1d4ed8" : "#64748b";
                        $tbody.append(`
                            <tr>
                                <td><strong>#${s.id}</strong></td>
                                <td>${s.name}</td>
                                <td><code>${s.regId || "—"}</code></td>
                                <td>${s.city}</td>
                                <td>${s.age}</td>
                                <td><span style="color:${gradeColor};font-weight:700;">${s.grade || "—"}</span></td>
                                <td>${s.course || "—"}</td>
                            </tr>
                        `);
                    });
                }

                // Show raw JSON
                $("#json-get-output").text(JSON.stringify(data, null, 2));

                setStatus("success", "✅", `Loaded ${students.length} student record(s) via GET /api/students (200 OK).`);
            },
            error: function (xhr) {
                console.error("[GET Error]", xhr);
                $("#students-tbody").html(`<tr class="empty-row"><td colspan="7" style="color:#b91c1c;">GET request failed. Is the Express server running? (node server.js)</td></tr>`);
                setStatus("error", "❌", `GET request failed. HTTP ${xhr.status || "Network Error"}.`);
                $("#json-get-output").text(JSON.stringify({ error: xhr.statusText, status: xhr.status }, null, 2));
            },
            complete: function () {
                $btn.prop("disabled", false).text("⟳ Load Students (GET)");
            }
        });
    });

    // Toggle GET JSON view
    $("#btn-toggle-json-get").on("click", function () {
        $("#json-get-output").toggleClass("hidden");
    });

    // ─── POST: Add New Student ─────────────────────────────
    $("#add-student-form").on("submit", function (e) {
        e.preventDefault();

        const name  = $("#f-name").val().trim();
        const regId = $("#f-regid").val().trim();
        const city  = $("#f-city").val().trim();
        const age   = parseInt($("#f-age").val());
        const grade = $("#f-grade").val();
        const course = $("#f-course").val().trim() || "FSD";

        // Basic client-side validation
        if (!name || !city || isNaN(age)) {
            setStatus("error", "⚠️", "Please fill Name, City, and Age before submitting.");
            return;
        }

        const payload = { name, regId, city, age, grade, course };
        console.log("[POST] Sending payload:", payload);

        setStatus("loading", "⏳", "Sending POST request with new student data to Express API...");
        $("#btn-submit-student").prop("disabled", true).text("Submitting...");

        $.ajax({
            url: API_BASE + "/api/students",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(payload),
            dataType: "json",
            timeout: 8000,
            success: function (data) {
                console.log("[POST 201 Created]", data);

                // Show response JSON
                $("#json-post-output").text(JSON.stringify(data, null, 2));
                $("#post-status-tag").text("201 Created").removeClass().addClass("status-code-tag code-201");
                $("#post-response-box").show();

                // Append new row directly to table if visible
                const s = data.student;
                if (s && $("#students-tbody tr.empty-row").length === 0) {
                    const $newRow = $(`
                        <tr class="new-row">
                            <td><strong>#${s.id}</strong></td>
                            <td>${s.name}</td>
                            <td><code>${s.regId || "—"}</code></td>
                            <td>${s.city}</td>
                            <td>${s.age}</td>
                            <td><span style="font-weight:700;">${s.grade || "—"}</span></td>
                            <td>${s.course || "—"}</td>
                        </tr>
                    `);
                    $("#students-tbody").append($newRow);
                    const newCount = parseInt($("#student-count-label").text()) + 1;
                    $("#student-count-label").text(newCount + " records");
                }

                setStatus("success", "✅", `Student "${s.name}" added successfully! Server responded with 201 Created.`);

                // Clear form
                $("#add-student-form")[0].reset();
                $("#f-course").val("FSD");
            },
            error: function (xhr) {
                console.error("[POST Error]", xhr);
                let errMsg = "POST request failed.";
                try {
                    const parsed = JSON.parse(xhr.responseText);
                    errMsg = parsed.message || errMsg;
                } catch(e) {}

                $("#json-post-output").text(JSON.stringify({ status: xhr.status, error: errMsg }, null, 2));
                $("#post-status-tag").text(xhr.status + " Error").removeClass().addClass("status-code-tag code-400");
                setStatus("error", "❌", `POST failed: ${errMsg}`);
            },
            complete: function () {
                $("#btn-submit-student").prop("disabled", false).text("➕ Submit Student (POST Request)");
            }
        });
    });

    // Clear Form button
    $("#btn-clear-form").on("click", function () {
        $("#add-student-form")[0].reset();
        $("#f-course").val("FSD");
        setStatus("idle", "ℹ️", "Form cleared.");
    });

    // Auto-load students on page ready
    setTimeout(function () {
        $("#btn-get-students").trigger("click");
    }, 400);
});
