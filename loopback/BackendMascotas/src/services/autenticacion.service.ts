import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {Usuario} from "../models";
import {UsuarioRepository} from "../repositories";
import {repository} from "@loopback/repository";
import {Llaves} from "../config/llaves";
const generador = require('password-generator');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
      @repository(UsuarioRepository)
      public usuarioRepository: UsuarioRepository) {}
  /*
   * Add service methods here
   */

  generarClave(){
    const clave = generador(8,false);
    return clave;
  }

    cifrarClave(clave: string){
    const claveCifrada = cryptoJS.MD5(clave);
    return claveCifrada;
  }

  identificarUsuario(usuario: string, contrasena: string) {
    try {
      const user = this.usuarioRepository.findOne({where: {correo: usuario, contrasena: contrasena}});
      if (user!=null) {
        return user;
      }
      return false;
    } catch {
      return false;
    }
  }

  generarTokenJWT(usuario: Usuario) {
    const token = jwt.sign({
          data: {
            id: usuario.id,
            correo: usuario.correo,
            nombre: usuario.nombre
          }
        },
        Llaves.claveJWT);
    return token;
  }

  validarTokenJWT(token:string){
    try{
      const datos = jwt.verify(token,Llaves.claveJWT);
      return datos;
    }catch{
      return false;
    }
  }
}
