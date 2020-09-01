# TESTS UNITAIRES

|  N°  |  ACTION | ATTENDU |RÉSULTAT|
|------|---------|---------|--------|
|  1   |    Aller sur l'accueil d'Orinours et appuyer sur le bouton d'une des cartes d'oursons    |    La page produit s'affiche avec le contenu correspondant à la carte cliquée    |    OK   |
|  2   |    Une fois sur la page produit, augmenter ou diminuer la quantité     |    Le prix des articles est automatiquement mis à jour    |    OK   |
|  3   |    Cliquer sur le panneau déroulant des déclinaisons de produits    |    Plusieurs déclinaisons sont affichées si elles sont disponibles    |    OK   |
|  4   |    Appuyer sur le bouton "ajouter au panier"    |    Le ou les articles sont bien ajoutés au panier    |    OK   |
|  5   |    Appuyer sur le bouton "Panier"    |    Le panier latéral s'ouvre bien    |    OK   |
|  6   |    Appuyer sur le bouton "Voir le détail du panier"    |    redirection vers la page panier, affichant le détail des produits ajoutés, si le panier est vide, un message l'indiquant est affiché   |    OK   |
|  7   |    Sur la page "Panier", cliquer sur supprimer un produit    |    La page s'actualise, et le produit est bien supprimé    |    OK   |
|  8   |    Sur la page panier, cliquer sur "Passer commande"    |    Un formulaire apparaît    |    OK   |
|  9   |    Sur le formulaire, laisser un champ vide    |    Le formulaire n'est pas validé    |    OK   |
|  10  |    Sur le formulaire, rentrer une adresse mail érronée    |    Le formulaire n'est pas validé et un message d'erreur s'affiche (JS)    |    OK   |
|  11  |    Valider le formulaire    |    Une page de confirmation comprenant le nom et le numéro de commande s'affiche    |    OK   |
|||||
|  12  |    Sur la page produit, rentrer un mauvais ID de produit    |    Message d'erreur + décompte et redirection vers l'accueil    |    OK   |
|  13  |    Essayer d'aller sur la page de confirmation    |    Redirection vers la page d'accueil    |    OK   |
|  14  |    Effacer le n° de commande ou le prénom de la page confirmation   |    message d'erreur affiché    |    OK   |