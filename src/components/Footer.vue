<template>
  <div class="footer-page">
    <div class="footer-conteudo">
      <button class="btn-seta" @click="voltar">
        <img class="seta" src="@/assets/mova_pag_tras.svg" alt="" />
      </button>

      <div class="btn" v-for="(pagina, index) in calcPages" :key="index">
        <button :class="{ ativo: estaAtivo }" @click="outraPagina(pagina)">
          {{ pagina }}
        </button>
      </div>

      <button class="btn-seta" @click="avancar">
        <img class="seta" src="@/assets/mova_pag_frente.svg" alt="" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: ["paisesFiltrados", "paisesPage", "paisesBandeira"],
  data() {
    return {
      estaAtivo: false,
    };
  },
  methods: {
    avancar() {
      if (this.$store.state.paginaAtual < this.calcPages) {
        this.$store.state.paginaAtual++;
      }
    },
    voltar() {
      if (this.$store.state.paginaAtual > 1) {
        this.$store.state.paginaAtual--;
      }
    },
    outraPagina(pagina) {
      this.$store.state.paginaAtual = pagina;
    },
  },
  computed: {
    calcPages() {
      return Math.ceil(this.paisesPage);
    },
  },
};
</script>

<style scoped>
.footer-page {
  margin-top: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-conteudo {
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  height: 34px;
  width: 34px;
  border-radius: 2px;
  box-sizing: border-box;
  border: none;
  background: #ffffff;
  box-shadow: 1px 7px 5px rgba(0, 0, 0, 0.4);
  transition: 0.3s;
  font-family: var(--font-principal);
  cursor: pointer;
  border-radius: 2px;
  margin-right: 4px;
  margin-left: 4px;
}

.btn-seta {
  background-color: #ffffff;
  box-shadow: 1px 5px 4px rgba(0, 0, 0, 0.4);
  border-radius: 2px;
  margin-right: 12px;
  margin-left: 12px;
  width: 30px;
  height: 30px;
}

button:hover {
  background-color: var(--color-background-button);
  color: white;
  transition: 0.3s;
}
img {
  width: 10px;
  margin: auto;
}

@media (max-width: 640px) {
  .footer-page,
  .footer-conteudo {
    flex-wrap: wrap;

    margin-top: 5px;
  }

  .footer-page button {
    margin: 0.4rem;
  }
}
</style>