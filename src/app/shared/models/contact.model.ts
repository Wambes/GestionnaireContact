//Modèle de données pour les contacts
export interface Contact {
  user_id: number; // L'ID de l'utilisateur qui a créé le contact
  id: number; // L'ID du contact
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  photo: string;
}
// L'ID de l'utilisateur est requis pour chaque contact