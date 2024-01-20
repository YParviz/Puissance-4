type TTpNotéForm = { 
    div_modal_1 : HTMLElement
    , div_modal_2 : HTMLElement
    , radioRdc : HTMLInputElement
    , radio1er : HTMLInputElement
    , radio2e : HTMLInputElement
    , radio3e : HTMLInputElement
    , edtSalle : HTMLInputElement
    , Batiment : HTMLSelectElement
    , chkInformatique : HTMLInputElement
    , edt_Nb_Postes : HTMLInputElement
    , liste_Salles_Répertoriées : HTMLSelectElement
    , btnAjouter : HTMLInputElement
    , btnRetirer : HTMLInputElement
}

class VueTpNoté {
    private _form : TTpNotéForm
    init(form : TTpNotéForm) : void {
    this._form = form;

    this.form.div_modal_2.hidden = true;
    this.form.radioRdc.onclick
    this.form.radio1er.onclick
    this.form.radio2e.onclick
    this.form.radio3e.onclick

    this.form.btnRetirer.onclick
= function ():void { vueTpNoté.supprimerLigne(); }

this.form.radioRdc.onclick
= function ():void { vueTpNoté.changeEtage(); }
this.form.radio1er.onclick
= function ():void { vueTpNoté.changeEtage(); }
this.form.radio2e.onclick
= function ():void { vueTpNoté.changeEtage(); }
this.form.radio3e.onclick
= function ():void { vueTpNoté.changeEtage(); }

this.form.chkInformatique.onchange
= function ():void { vueTpNoté.informatiqueNbPosteChange(); }

this.form.btnAjouter.onclick
= function ():void { vueTpNoté.valideSaisie(); }
this.form.btnRetirer.onclick
= function ():void { vueTpNoté.supprimerLigne(); }

  
    }
    get form() : TTpNotéForm { return this._form }

changeEtage() : void {
    let chaine : string;
    if (this.form.radioRdc.checked) { chaine = "Rdc" }
    if (this.form.radio1er.checked) { chaine = "1er" }
    if (this.form.radio2e.checked) { chaine = "2e" }
    if (this.form.radio3e.checked) { chaine = "3e" }
    else { chaine = "" }
    // changement de la balise <label> liée à la zone de saisie "edt_nais"
    this.form.liste_Salles_Répertoriées.labels[0].textContent = chaine;
}

informatiqueNbPosteChange() : void {
    // cacher la zone de saisie "edt_autre" si la case "autre" est décochée
    this.form.edt_Nb_Postes.hidden = !this.form.chkInformatique.checked;
    this.form.edt_Nb_Postes.value = '';
    // placer le focus sur la zone de saisie
    this.form.edt_Nb_Postes.focus();
}
    

supprimerLigne() :void {
    const liste = this.form.liste_Salles_Répertoriées;
    const noLigne : number = liste.selectedIndex; 
    if (noLigne > -1) {
    liste.remove(noLigne);
    }
}

valideSaisie() : void {

    let étage = "";
    if (this.form.radioRdc.checked) { 
    étage = this.form.radioRdc.value
    }
    else if (this.form.radio1er.checked) {
    étage = this.form.radio1er.value
    }
    else if (this.form.radio2e.checked) {
        étage = this.form.radio2e.value
    }
    else if (this.form.radio3e.checked) {
        étage = this.form.radio3e.value
    }

    const salle : string = this.form.edtSalle.value.trim();
    const batiment : string = this.form.Batiment.value;
    const autre : string = this.form.edt_Nb_Postes.value.trim();

    let informatique = "";
        if (this.form.chkInformatique.checked) { 
        informatique += this.form.chkInformatique.value +', '
        }

    // traitement des erreurs
    let erreur = "";
    if (salle.length ===0) { erreur += "Nom Salle à écrire<br>"; }
    if (batiment.length === 0) { erreur += "Sélectionner un batiment<br>";}

    if (informatique.length === 0) { erreur += "Nombre de poste à renseigner<br>"; }
    else if (!this.form.chkInformatique.hidden) {
    // si système "autre" est coché alors "autre" ne doit pas être vide
    if (informatique.length === 0) {erreur += 'Nombre de poste à préciser<br>'; } 
    }   
    
    // affichage des informations dans la partie récapitulatif
// sinon affichage message d'erreur
if (erreur.length === 0) {
    // rendre inactif la partie "formulaire"
    // rendre visible la partie "récapitulatif"
    this.form.div_modal_2.style.pointerEvents = 'none';
    this.form.div_modal_1.hidden = false;
    const liste = this.form.liste_Salles_Répertoriées;

    liste.options.add(new Option(salle +' '+batiment +' ' +étage+' '+autre));
}
}
}
let vueTpNoté = new VueTpNoté;
export { vueTpNoté }