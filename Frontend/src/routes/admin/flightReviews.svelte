<script>
  import { reviewStore } from '../../stores/flightStore'
  import Review from '../../components/reviews/review.svelte'
</script>

<body>
  <Review flightId={$reviewStore.flightId} />
</body>
