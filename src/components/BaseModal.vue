<template lang="pug">
transition(name="fade")
  div(v-if="$store.state.modal")
    .modal.d-block(role="dialog")
      .modal-dialog.modal-dialog-scrollable.modal-dialog-centered.modal-xl
        .modal-content
          .modal-header
            button(type="button" class="close" data-dismiss="modal" aria-label="Close" @click="$store.commit('CHANGE_MODAL', false)")
              span(aria-hidden="true") &times;
          .modal-body
            slot
</template>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
