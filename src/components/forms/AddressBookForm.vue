<template>
  <div class="w-100">
    <v-card class="mx-auto pa-12 pb-8 mb-4 w-100" max-width="448">
      <v-text-field
        v-model="addressBookToUpdate.firstName"
        label="First Name"
        placeholder="John"
        required
      ></v-text-field>
      <v-text-field
        v-model="addressBookToUpdate.LastName"
        label="Last Name"
        placeholder="Doe"
        required
      ></v-text-field>
      <v-text-field
        v-model="addressBookToUpdate.phoneNumber"
        label="Phone Number"
        placeholder="+234 09187382737"
      ></v-text-field>
      <v-text-field
        v-model="addressBookToUpdate.prefix"
        label="Country dial code"
        placeholder="+1"
      ></v-text-field>
      <v-autocomplete
        v-model="addressBookToUpdate.country"
        :items="countries"
        label="Country"
        placeholder="Select..."
      ></v-autocomplete>
      <v-text-field
        ref="state"
        v-model="addressBookToUpdate.state"
        label="State/Province/Region"
        placeholder="Texas"
      ></v-text-field>
      <v-text-field
        v-model="addressBookToUpdate.city"
        label="City"
        placeholder="El Paso"
      ></v-text-field>
      <v-text-field
        v-model="addressBookToUpdate.deliveryAddress"
        label="delivery address"
        placeholder="delivery address....."
      ></v-text-field>
      <v-text-field
        v-model="addressBookToUpdate.additionalInfo"
        label="additional info"
      ></v-text-field>
      <!-- <v-divider class="mt-12"></v-divider> -->
      <div class="submBtn d-flex justify-end w-100">
        <v-btn
          class="mb-0"
          color="blue"
          size="x-large"
          variant="tonal"
          @click="userStore.updateUser(updatedForm)"
        >
          Save
        </v-btn>
      </div>
    </v-card>
  </div>
</template>
  <script setup>
import { ref, defineProps, reactive } from "vue";
import { useUserStore } from "@/store/userStore";

const { updatedForm } = defineProps(["updatedForm"]);
const userStore = useUserStore();

// console.log(updatedForm);

const addressBook = reactive(userStore.user.addressBook);
// console.log(addressBook);

const addressBookToUpdate = reactive({
  firstName: addressBook.firstName,
  LastName: addressBook.LastName,
  phoneNumber: addressBook.phoneNumber,
  prefix: addressBook.prefix,
  country: addressBook.country,
  state: addressBook.state,
  city: addressBook.city,
  deliveryAddress: addressBook.deliveryAddress,
  additionalInfo: addressBook.additionalInfo,
});
// console.log(addressBookToUpdate);

updatedForm.addressBook = addressBookToUpdate;

console.log(updatedForm);

const countries = ref([
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua &amp; Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia &amp; Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Cape Verde",
  "Cayman Islands",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cruise Ship",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyz Republic",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre &amp; Miquelon",
  "Samoa",
  "San Marino",
  "Satellite",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "St Kitts &amp; Nevis",
  "St Lucia",
  "St Vincent",
  "St. Lucia",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  `Timor L'Este`,
  "Togo",
  "Tonga",
  "Trinidad &amp; Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks &amp; Caicos",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe",
]);
</script>