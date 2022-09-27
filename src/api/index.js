const API_NS = ' -- API:ALL -- ';

function $build() {
  return {
  }
}

const $all = window[API_NS] || (window[API_NS] = $build());

export default $all;
