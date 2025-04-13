//Modèle de données pour un utilisateur
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string; // Mot de passe de l'utilisateur
  phone: string;
  role: 'Admin' | 'User'; // Le rôle de l'utilisateur (Admin ou User)
}