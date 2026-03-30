<template>
  <div
    class="card"
    :class="{ canBuy: nft.price, card_selected: nft.selected }"
    @click="handleToggle"
  >
    <transition name="fade">
      <span v-if="nft.selected" class="material-icons check-icon">done</span>
    </transition>
    <figure class="card-img">
      <img :src="nft.url" alt="A Pixel People Feature" />
    </figure>
    <div class="card-container">
      <p class="card-name">{{ nft.name }}</p>
      <p
        v-if="nft.price"
        class="card-detail"
        :class="{ card_detail_selected: nft.selected }"
      >
        {{ nft.price }} ETH
      </p>
      <p
        v-else-if="nft.number"
        class="card-detail"
        :class="{ card_detail_selected: nft.selected }"
      >
        {{ nft.number }}
      </p>
    </div>
  </div>
</template>

<script>
import getDocument from "@/composables/getDocument";
import useDocument from "@/composables/useDocument";
import getUser from "@/composables/getUser";
import { toRaw, watch } from "@vue/runtime-core";
export default {
  props: ["nft", "nfts"],
  setup(props) {
    const { user } = getUser();
    const { document: userDoc } = getDocument("users", user.value.uid);
    const { updateDoc, error } = useDocument("users", user.value.uid);

    const handleToggle = async () => {
      if (props.nft.price) {
        const type = props.nft.type;
        let choices = toRaw(userDoc.value.choices);
        if (!props.nft.selected) {
          //if the card is not selected, the feature is added to the choices array
          props.nfts.forEach((nft) => {
            nft.selected = false;
          });
          choices[type] = props.nft;
          console.log("choices:", choices);
          await updateDoc({ choices: choices });
        } else {
          //if the card is already selected, it is removed from the array
          props.nft.selected = !props.nft.selected;
          // choices = choices.filter((choice) => choice.type != type);
          delete choices[type];
          console.log("choices:", choices);
          await updateDoc({ choices: choices });
        }
      }
    };

    watch(userDoc, () => {
      if (userDoc.value) {
        let choices = toRaw(userDoc.value.choices);
        Object.values(choices).forEach((choice) => {
          if (choice.id === props.nft.id) {
            props.nft.selected = true;
          }
        });
      }
    });

    // console.log(props.nft.path)

    return { handleToggle };
  },
};
</script>

<style scoped>
.card {
  padding: 1.2rem 0.8rem 1.2rem 0.8rem;
  border-radius: 4px;
  background-color: #2a2f4e;
  box-shadow: 0 0.4rem 1.2rem 0rem rgba(0, 0, 0, 0.18);
  position: relative;
  transition: all 0.25s;
}
.card:hover {
  /* transform: translateY(-0.8rem) scale(1.04); */
  transform: translateY(-0.4rem) scale(1.02);
  box-shadow: 0 0.4rem 1.6rem 0.4rem rgba(0, 0, 0, 0.18);
}
.card_selected {
  background-color: #ffc825;
  color: #1a1932;
}

/* Card Image */
.card-img {
  overflow: hidden;
  border-radius: 4px;
  margin-bottom: 1.6rem;
}
.card-img img {
  display: block;
  width: 100%;
  transition: all 0.25s;
}
.card-img img:hover {
  transform: scale(1.02);
}

/* Card Text */
.card-name {
  font-size: 1.8rem;
  font-weight: 500;
}
.card-detail {
  color: #92a1b9;
  font-size: 1.4rem;
}
.card-detail.card_detail_selected {
  color: #1a1932;
}
.card-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0.4rem;
}

/* Check mark */
.check-icon {
  color: #ffc825;
  font-size: 3rem;
  font-weight: 600;
  border-radius: 4px;
  padding: 0.4rem;
  margin-left: 0.8rem;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(30%, -30%);
  z-index: 999;
  background-color: #2a2f4e;
}

.canBuy {
  cursor: pointer;
}
</style>
