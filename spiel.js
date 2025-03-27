const canvas = document.getElementById('spielCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let spielerX = canvas.width / 2;
let spielerY = canvas.height / 2;
let zielX = 0;
let zielY = 0;
let schuesse = [];

function zeichneSpieler() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(spielerX - 10, spielerY - 10, 20, 20);
}

function zeichneZiel() {
    ctx.fillStyle = 'red';
    ctx.fillRect(zielX - 5, zielY - 5, 10, 10);
}

function zeichneSchuesse() {
    ctx.fillStyle = 'black';
    for (let schuss of schuesse) {
        ctx.fillRect(schuss.x - 2, schuss.y - 2, 4, 4);
    }
}

function aktualisiereSchuesse() {
    for (let i = schuesse.length - 1; i >= 0; i--) {
        schuesse[i].x += schuesse[i].dx;
        schuesse[i].y += schuesse[i].dy;

        // Entferne Schüsse, die aus dem Bildschirm gehen
        if (schuesse[i].x < 0 || schuesse[i].x > canvas.width || schuesse[i].y < 0 || schuesse[i].y > canvas.height) {
            schuesse.splice(i, 1);
        }
    }
}

function aktualisiereSpiel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    zeichneSpieler();
    zeichneZiel();
    zeichneSchuesse();
    aktualisiereSchuesse();
    requestAnimationFrame(aktualisiereSpiel);
}

canvas.addEventListener('mousemove', (e) => {
    zielX = e.clientX;
    zielY = e.clientY;
});

canvas.addEventListener('click', (e) => {
    const dx = zielX - spielerX;
    const dy = zielY - spielerY;
    const distanz = Math.sqrt(dx * dx + dy * dy);

    schuesse.push({
        x: spielerX,
        y: spielerY,
        dx: dx / distanz * 5,
        dy: dy / distanz * 5,
    });
});

aktualisiereSpiel();