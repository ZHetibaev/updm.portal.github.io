
async function loadUser() {
    let iin = document.getElementById("iin").value;

    let res = await fetch("getUser.php?iin=" + iin);
    let data = await res.json();

    let docs = document.getElementById("docs");
    docs.innerHTML = "";

    if (data.error) {
        document.getElementById("user").innerText = "Не найден";
        return;
    }

    document.getElementById("user").innerText =
        data.user.name + " (" + data.user.iin + ")";

    let html = "";

    // 📄 DOCUMENTS
    html += "<h2>📄 Документы</h2>";

    data.documents.forEach(d => {
        html += `
        <div class="card">
            <b>${d.name}</b><br>
            ${d.type}<br>
            Status: ${d.status}
        </div>
        `;
    });

    // 🔐 PERMISSIONS
    html += "<h2>🔐 Управление доступом</h2>";

    if (data.permissions && data.permissions.length > 0) {
        data.permissions.forEach(p => {
            html += `
            <div class="card">
                <h3>🏢 ${p.organization_name}</h3>
                Status: <b>${p.status}</b><br><br>

                <button onclick="setPerm('${p.organization_name}','active')">Active</button>
                <button onclick="setPerm('${p.organization_name}','limited')">Limited</button>
                <button onclick="setPerm('${p.organization_name}','blocked')">Blocked</button>
            </div>
            `;
        });
    } else {
        html += "<p>Нет данных</p>";
    }

    // 🏛️ ORGANIZATIONS (ГРУППИРОВКА)
    html += "<h2>🏛️ Кто получал данные</h2>";

    if (data.access_logs && data.access_logs.length > 0) {

        let grouped = {};

        data.access_logs.forEach(log => {
            if (!grouped[log.organization_name]) {
                grouped[log.organization_name] = [];
            }
            grouped[log.organization_name].push(log.document_name);
        });

        for (let org in grouped) {
            html += `
            <div class="card">
                <h3>🏢 ${org}</h3>
                ${grouped[org].map(doc => `📄 ${doc}`).join("<br>")}
                <br><br>
                ⏱ ${new Date().toLocaleString()}
            </div>
            `;
        }

    } else {
        html += "<p>Нет данных</p>";
    }

    // ВАЖНО!
    docs.innerHTML = html;
}

// 🔧 ВНЕ функции!
async function setPerm(org, status) {
    let iin = document.getElementById("iin").value;

    await fetch("updatePermission.php", {
        method: "POST",
        headers: {"Content-Type":"application/x-www-form-urlencoded"},
        body: `iin=${iin}&org=${org}&status=${status}`
    });

    loadUser();
}