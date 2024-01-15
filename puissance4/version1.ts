function initialiserGrille(nr: number, nc: number): Array<Array<number>> {
    let g = new Array<Array<number>>();
    for (let i = 0; i < nr; i++) {
        let ligne = new Array<number>();
        for (let j = 0; j < nc; j++) {
            ligne.push(0);
        }
        g.push(ligne);
    }
    return g;
}

function nr(g: Array<Array<number>>): number {
    return g.length
}

function nc(g: Array<Array<number>>): number {
    return g[0].length;
}

function afficherGrille(g: Array<Array<number>>): void {
    console.clear()
    for (let i = 0; i < g.length; i++) {
        let ligneAffichage = '';
        for (let j = 0; j < g[i].length; j++) {
            if (g[i][j] === 1) {
                ligneAffichage += 'O';
            } else if (g[i][j] === 2) {
                ligneAffichage += 'X';
            } else {
                ligneAffichage += '-';
            }
            if (j < g[i].length - 1) {
                ligneAffichage += ' ';
            }
        }
        console.log(ligneAffichage);
    }

    let ligneSeparation = '';
    for (let i = 0; i < g[0].length; i++) {
        ligneSeparation += '=';
        if (i < g[0].length - 1) {
            ligneSeparation += ' ';
        }
    }
    console.log(ligneSeparation);

    let indicesColonnes = '';
    for (let i = 0; i < g[0].length; i++) {
        indicesColonnes += i;
        if (i < g[0].length - 1) {
            indicesColonnes += ' ';
        }
    }
    console.log(indicesColonnes);
}

function estCoupValide(g: Array<Array<number>>, colonne: number): boolean {
    return g[0][colonne] === 0;
}

function trouverLignePourCoup(g: Array<Array<number>>, colonne: number): number {
    for (let i = g.length - 1; i >= 0; i--) {
        if (g[i][colonne] === 0) {
            return i;
        }
    }
    return -1;
}

function jouerCoup(g: Array<Array<number>>, colonne: number, joueur: number): void {
    let ligne = trouverLignePourCoup(g, colonne);
    if (ligne !== -1) {
        g[ligne][colonne] = joueur;
    }
}

function isAlign(g: Array<Array<number>>, lc: Array<[number, number]>, joueur: number): boolean {
    let compteConsécutif = 0;
    for (let [r, c] of lc) {
        if (r >= 0 && r < g.length && c >= 0 && c < g[0].length && g[r][c] === joueur) {
            compteConsécutif++;
            if (compteConsécutif === 4) return true;
        } else {
            compteConsécutif = 0;
        }
    }
    return false;
}

function isWin(g: number[][], r: number, c: number, joueur: number): boolean {
    // Vérifier la ligne horizontale
    let lc : Array<[number, number]> = [];
    for (let j = -3; j <= 3; j++) {
        lc.push([r, c + j]);
    }
    if (isAlign(g, lc, joueur)) return true;

    // Vérifier la colonne verticale
    lc = [];
    for (let i = -3; i <= 3; i++) {
        lc.push([r + i, c]);
    }
    if (isAlign(g, lc, joueur)) return true;

    // Vérifier la diagonale descendante
    lc = [];
    for (let i = -3; i <= 3; i++) {
        lc.push([r + i, c + i]);
    }
    if (isAlign(g, lc, joueur)) return true;

    // Vérifier la diagonale ascendante
    lc = [];
    for (let i = -3; i <= 3; i++) {
        lc.push([r + i, c - i]);
    }
    return isAlign(g, lc, joueur);
}

function ia_aleat(g: number[][]): number {
    let colonnesValides = [];
    for (let c = 0; c < g[0].length; c++) {
        if (estCoupValide(g, c)) {
            colonnesValides.push(c);
        }
    }
    return colonnesValides[Math.floor(Math.random() * colonnesValides.length)];
}

function ia_win(g: number[][], joueur: number): number {
    for (let c = 0; c < g[0].length; c++) {
        if (estCoupValide(g, c)) {
            let r = trouverLignePourCoup(g, c);
            jouerCoup(g, c, joueur);
            if (isWin(g, r, c, joueur)) {
                unmove(g, c);
                return c;
            }
            unmove(g, c);
        }
    }
    return ia_aleat(g);
}

function unmove(g: number[][], colonne: number): void {
    for (let r = 0; r < g.length; r++) {
        if (g[r][colonne] !== 0) {
            g[r][colonne] = 0;
            break;
        }
    }
}

function estGrillePleine(grille: Array<Array<number>>): boolean {
    for (let i = 0; i < grille.length; i++) {
        for (let j = 0; j < grille[i].length; j++) {
            if (grille[i][j] === 0) {
                return false;
            }
        }
    }
    return true;
}

function play(): void {
    let grille = initialiserGrille(6, 7);
    let joueurActuel = 1;

    while (true) {
        afficherGrille(grille);

        let colonne: number;
        do {
            // Ici, remplacez par votre méthode de saisie de coup
            // Assurez-vous que la valeur saisie est un nombre et est convertie correctement
            colonne = Number(prompt("Joueur "+ joueurActuel + ", choisissez une colonne (0-6) : "));
        } while (!estCoupValide(grille, colonne));

        let ligne = trouverLignePourCoup(grille, colonne);
        jouerCoup(grille, colonne, joueurActuel);

        if (isWin(grille, ligne, colonne, joueurActuel)) {
            afficherGrille(grille);
            console.log(`Joueur ${joueurActuel} gagne !`);
            break;
        }

        joueurActuel = joueurActuel === 1 ? 2 : 1;

        if (estGrillePleine(grille)) {
            console.log("Match nul ! La grille est complète.");
            break;
        }
    }
}


play()