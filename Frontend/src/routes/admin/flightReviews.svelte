<script>
    import { reviewStore } from '../../stores/flightStore'
    import Review from '../../components/reviews/review.svelte'

    console.log($reviewStore.flightId)
</script>

<body>
    <Review flightId={$reviewStore.flightId}/>
</body>