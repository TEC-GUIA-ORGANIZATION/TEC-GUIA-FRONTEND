import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './constantes.service';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
// This service is responsible for managing authentication
// It has methods to login, logout, sign up, change password and recover password
export class GestorAutenticacion {
  private url = `${API_URL}/autenticacion`;

  /**
   * Constructor
   * @param http HttpClient
   */
  constructor(private http: HttpClient) {}

  // TODO: Implement
  login(usuario: Usuario) {}

  // TODO: Implement
  logout() {}

  // TODO: Implement
  signup(usuario: Usuario) {}

  // TODO: Implement
  cambiarContrasena(usuario: Usuario) {}

  // TODO: Implement
  recuperarContrasena(usuario: Usuario) {}
}
