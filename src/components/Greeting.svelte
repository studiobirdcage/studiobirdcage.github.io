<script lang="ts">
    function greet() {
        alert("Welcome to Scvelte!");
    }
</script>

<button onclick={greet}>Click Me</button>

<style>
    button {
        cursor: pointer;
        font-size: 28px;
        color: tomato;
    }
</style>
