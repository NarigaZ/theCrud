package br.com.mkdata.teste.controller.dto;

import br.com.mkdata.teste.modelo.Telefone;

import java.time.LocalDateTime;

public class TelefoneDto {

    private String ddd;
    private String numero;

    public TelefoneDto(Telefone telefone) {
        this.ddd = telefone.getDdd();
        this.numero = telefone.getNumero();
    }

    public String getDdd() {
        return ddd;
    }

    public String getNumero() {
        return numero;
    }
}
