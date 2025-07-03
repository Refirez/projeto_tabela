class Entregador:
    def __init__(self, nome, gorjeta, valor_entrega, qtd_entrega, salario):
        self.gorjeta = gorjeta
        self.nome = nome
        self.valor_entrega = valor_entrega
        self.qtd_entrega = qtd_entrega
        self.salario = salario
    
    def qual_a_gorjeta(self):
        total_entrega = self.valor_entrega * self.qtd_entrega
        gorjeta = self.salario - total_entrega
        return gorjeta
    
    def entrega_feita(self, quantidade=1):
        self.qtd_entrega += quantidade

    def pagar_salario(self):
        return self.salario
    
    def atualizar_valor_entrega(self, novo_valor):
        self.valor_entrega = novo_valor

entregador = Entregador('Joao', 12.40, 3, 60, 2000)




