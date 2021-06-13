package br.com.mkdata.teste.controller.form;

import br.com.mkdata.teste.modelo.Cliente;
import br.com.mkdata.teste.modelo.Telefone;
import br.com.mkdata.teste.modelo.TipoPessoa;
import br.com.mkdata.teste.repository.ClienteRepository;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

public class ClienteForm {
    @NotNull @NotEmpty
    private String nome;

    @NotNull @NotEmpty
    private String tipoPessoa;

    @NotNull @NotEmpty
    private String cpfCnpj;

    @NotNull @NotEmpty
    private String rgIe;

    @NotNull
    private Boolean ativo;

    private List<Telefone> telefones = new ArrayList<>();

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setTipoPessoa(String tipoPessoa) {
        this.tipoPessoa = tipoPessoa;
    }

    public void setCpfCnpj(String cpfCnpj) {
        this.cpfCnpj = cpfCnpj;
    }

    public void setRgIe(String rgIe) {
        this.rgIe = rgIe;
    }

    public void setTelefones(List<Telefone> telefones) {
        this.telefones = telefones;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }

    public Cliente converter() {
        if (this.tipoPessoa.equals(TipoPessoa.FISICA.toString())){
            return new Cliente(nome, TipoPessoa.FISICA, cpfCnpj, rgIe, telefones , ativo);
        }else {
            return new Cliente(nome, TipoPessoa.JURIDICA, cpfCnpj, rgIe, telefones, ativo);
        }
    }

    public Cliente atualizar(Long id, ClienteRepository topicoRepository) {
        Cliente cliente = topicoRepository.getOne(id);

        cliente.setNome(this.nome);
        if (this.tipoPessoa.equals(TipoPessoa.FISICA.toString())){
            cliente.setTipoPessoa(TipoPessoa.FISICA);
        } else {
            cliente.setTipoPessoa(TipoPessoa.JURIDICA);
        }
        cliente.setCpfCnpj(this.cpfCnpj);
        cliente.setRgIe(this.rgIe);
        cliente.setTelefones(this.telefones);
        cliente.setAtivo(this.ativo);

        return cliente;
    }
}
