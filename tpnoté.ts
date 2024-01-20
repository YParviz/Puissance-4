import {vueTpNoté} from "../controleur/class_tpnoté"

vueTpNoté.init (
    { div_modal_1 :document.querySelector('[id=div_modal_1]')
    ,div_modal_2 :document.querySelector('[id=div_modal_2]')
    ,radioRdc :document.querySelector('[id=radio_rdc]')
    ,radio1er :document.querySelector('[id=radio_1er_étage]')
    ,radio2e :document.querySelector('[id=radio_2e_étage]')
    ,radio3e :document.querySelector('[id=radio_3e_étage]')
    ,edtSalle :document.querySelector('[id=edt_nom]')
    ,Batiment :document.querySelector('[id=select_batiment]')
    ,chkInformatique :document.querySelector('[id=chk_informatique]')
    ,edt_Nb_Postes :document.querySelector('[id=nbr_postes]')
    ,liste_Salles_Répertoriées :document.querySelector('[id=select_texte]')
    ,btnAjouter :document.querySelector('[id=btn_ajouter]')
    ,btnRetirer :document.querySelector('[id=btn_retirer]')
    } );