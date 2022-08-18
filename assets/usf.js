/* USF file - DO NOT MODIFY THIS FILE. THIS FILE IS REGULARLY CHANGED BY USF APP AND **ANY DIRECT CHANGES WILL BE LOST**. Use our in-app customization if you need to update CSS and JS code. Auto modified at: 6/1/2022 3:25:57 PM*/
/* Begin custom theme code */
// define templates for the Expanse 1.0.2 theme

var _usfImageWidths, usfFilesUrl;
var _usfFilterBodyTemplate = /*inc_begin_filter-body*/
`<!-- Range filter -->
<div v-if="isRange" class="usf-facet-values usf-facet-range">
    <!-- Range inputs -->
    <div class="usf-slider-inputs usf-clear">
        <span class="usf-slider-input__from">
            <span class="usf-slider-input__prefix" v-html="facet.sliderPrefix" v-if="facet.showSliderInputPrefixSuffix"></span>
            <input :readonly="!hasRangeInputs" :value="rangeConverter(range[0]).toFixed(rangeDecimals)" @change="e => onRangeInput(e, range[0], 0)">
            <span class="usf-slider-input__suffix" v-html="facet.sliderSuffix" v-if="facet.showSliderInputPrefixSuffix"></span>
        </span>
        <span class="usf-slider-div">-</span>
        <span class="usf-slider-input__to">
            <span class="usf-slider-input__prefix" v-html="facet.sliderPrefix" v-if="facet.showSliderInputPrefixSuffix"></span>
            <input :readonly="!hasRangeInputs" :value="rangeConverter(range[1]).toFixed(rangeDecimals)" @change="e => onRangeInput(e, range[1], 1)">
            <span class="usf-slider-input__suffix" v-html="facet.sliderSuffix" v-if="facet.showSliderInputPrefixSuffix"></span>
        </span>
    </div>
	<!-- See API reference of this component at https://docs.sobooster.com/search/storefront-js-api/slider-component -->
    <usf-slider :color="facet.sliderColor" :symbols="facet.sliderValueSymbols" :prefix="facet.sliderPrefix" :suffix="facet.sliderSuffix" :min="facet.min" :max="facet.max" :pips="facet.range[0]" :step="facet.range[1]" :decimals="rangeDecimals" :value="range" :converter="rangeConverter" @input="onRangeSliderInput" @change="onRangeSliderChange"></usf-slider>
</div>
<!-- List + Swatch filter -->
<div v-else ref="values" :class="'usf-facet-values usf-scrollbar usf-facet-values--' + facet.display + (facet.navigationCollections ? ' usf-navigation' : '') + (facet.valuesTransformation ? (' usf-' + facet.valuesTransformation.toLowerCase()) : '') + (facet.circleSwatch ? ' usf-facet-values--circle' : '')" :style="!usf.isMobileFilter && facet.maxHeight ? { maxHeight: facet.maxHeight } : null">
    <!-- Filter options -->                
    <usf-filter-option v-for="o in visibleOptions" :facet="facet" :option="o" :key="o.label"></usf-filter-option>
</div>

<!-- More -->
<div v-if="isMoreVisible" class="usf-more" @click="onShowMore" v-html="loc.more"></div>`
/*inc_end_filter-body*/;

var _usfSearchResultsSkeletonItemTpl = /*inc_begin_search-skeleton-item*/
    `<div v-if="view === 'grid'" class="usf-sr-product usf-skeleton">
    <div class="usf-img"></div>
    <div class="usf-meta"></div>
</div>
<div class="usf-sr-product usf-skeleton" v-else>
    <!-- Image column -->
    <div class="usf-img-column">
        <div class="usf-img"></div>
    </div>

    <!-- Info column -->
    <div class="usf-info-column">
        <div class="usf-title"></div>
        <div class="usf-vendor"></div>
        <div class="usf-price-wrapper"></div>
    </div>
</div>`
/*inc_end_search-skeleton-item*/;

var _usfSearchResultsSummaryTpl = /*inc_begin_search-summary*/
`<span class="usf-sr-summary" v-html="loader === true ? '&nbsp;' : usf.utils.format(term ? loc.productSearchResultWithTermSummary : loc.productSearchResultSummary, result.total, usf.utils.encodeHtml(term))"></span>`
/*inc_end_search-summary*/;

var _usfSearchResultsViewsTpl =
    `<ul class="no-bullets inline-list text-right">
          <li><button type="button" class="grid-view-btn" data-view="large" title="Large" :class="{'is-active': _usfProductGridView == 'large'}">
            <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-view-large" viewBox="0 0 35 35"><path d="M0 0h35v35H0z"/></svg>
            <span class="icon__fallback-text">Large</span>
          </button></li>
          <li><button type="button" class="grid-view-btn" :class="{'is-active': _usfProductGridView == 'small'}" data-view="small" title="Small">
            <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-view-small" viewBox="0 0 35 35"><path d="M0 0h15v15H0zM20 0h15v15H20zM0 20h15v15H0zM20 20h15v15H20z"/></svg>
            <span class="icon__fallback-text">Small</span>
          </button></li>
          <li><button type="button" class="grid-view-btn" :class="{'is-active': _usfProductGridView == 'list'}" data-view="list" title="List">
            <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-view-list" viewBox="0 0 35 35"><g id="Layer_2" data-name="Layer 2"><path d="M0 0h35v8H0zM0 13h35v8H0zM0 27h35v8H0z"/></g></svg>
            <span class="icon__fallback-text">List</span>
          </button></li>
        </ul>`
    ;


var _usfSearchResultsSortByTpl = /*inc_begin_search-sortby*/
`<usf-dropdown :placeholder="loc.sort" :value="sortBy" :options="sortByOptions" @input="onSortByChanged"></usf-dropdown>`
/*inc_end_search-sortby*/;

usf.templates = {
    // application
    app: 
`<div id="usf_container" class="usf-zone usf-clear" :class="{'usf-filters-horz': usf.settings.filters.horz}">
    <expanse-filter class="usf-sr-filters"></expanse-filter>
    <usf-sr></usf-sr>
</div>`
,

    // search results
    searchResults: `
<div class="usf-sr-container" :class="{'usf-no-facets': noFacets, 'usf-empty': !loader && !hasResults, 'usf-nosearch': !showSearchBox}">
    <!-- Search form -->
    <form v-if="showSearchBox" action="/search" method="get" role="search" class="usf-sr-inputbox">
        <button type="submit" class="usf-icon usf-icon-search usf-btn"></button>
        <input name="q" autocomplete="off" ref="searchInput" v-model="termModel">
        <button v-if="termModel" class="usf-remove usf-btn" @click.prevent.stop="clearSearch"></span>
    </form>

    <div class="usf-sr-config" v-if="usf.isMobile">
        <div class="usf-sr-config__mobile-filters-wrapper">
            <div class="usf-filters" :class="{'usf-has-filters': !!facetFilters}" @click="onMobileToggle">
                <button class="usf-btn" v-html="loc.filters"></button>
            </div>
            ` + _usfSearchResultsSortByTpl + `
        </div>
        
        ` + _usfSearchResultsSummaryTpl + _usfSearchResultsViewsTpl + `
    </div>
    <div class="usf-sr-config" v-else>
        ` + _usfSearchResultsViewsTpl + _usfSearchResultsSummaryTpl + _usfSearchResultsSortByTpl + `
    </div>

    <usf-sr-banner v-if="result && result.extra && result.extra.banner && !result.extra.banner.isBottom" :banner="result.extra.banner"></usf-sr-banner>

    <!-- Load previous -->
    <div id="usf-sr-top-loader" :class="{'usf-with-loader':loader === 'prev'}" v-if="(loader === 'prev' || itemsOffset) && loader !== true && hasResults && usf.settings.search.more !== 'page'"></div>

    <div :data-view="_usfProductGridView" :class="(view === \'grid\' ? \'new-grid product-grid collection-grid\' : \'list-view-items\') + \' usf-results usf-clear usf-\' + view">
        <template v-if="loader===true">` + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl +
        `</template>
        <template v-else>
            <template v-if="hasResults">
                <template v-if="view === 'grid'">
                    <template v-for="p in result.items"><usf-expanse-griditem :product="p" :result="result"></usf-expanse-griditem></template>
                </template>
                <template v-else>
                    <template v-for="p in result.items"><usf-sr-listitem :product="p" :result="result" :key="p.id"></usf-sr-listitem></template>
                </template>
            </template>
            <template v-else>
                <!-- Empty result -->
                <div class="usf-sr-empty">
                    <div class="usf-icon"></div>
                    <span v-html="term ? usf.utils.format(loc.productSearchNoResults, term) : loc.productSearchNoResultsEmptyTerm"></span>
                    <button v-if="facetFilters" class="usf-btn usf-btn-action" v-html="loc.clearAllFilters" @click="usf.queryRewriter.removeAllFacetFilters"></button>
                </div>
            </template>
        </template>
    </div>

    <usf-sr-banner v-if="result && result.extra && result.extra.banner && result.extra.banner.isBottom" :banner="result.extra.banner"></usf-sr-banner>

    <!-- Paging & load more -->
    <div class="usf-sr-paging" v-if="loader !== true">
        <div class="usf-sr-more" v-if="hasResults && usf.settings.search.more === 'more'">
            <div class="usf-title" v-html="usf.utils.format(loc.youHaveViewed, itemsLoaded, result.total)"></div>
            <div class="usf-progress">
                <div :style="{width: (itemsLoaded * 100 / result.total) + '%'}"></div>
            </div>
            <button v-if="itemsLoaded < result.total" class="usf-load-more" :class="{'usf-with-loader': loader === 'more'}" @click="onLoadMore"><span v-html="loc.loadMore"></span></button>
        </div>
        <usf-sr-pages v-else-if="hasResults && usf.settings.search.more === 'page'" :page="page" :pages-total="pagesTotal" :pages-to-display="4" :side-pages-to-display="1"></usf-sr-pages>
        <div class="usf-sr-loader usf-with-loader" v-else-if="loader === 'more'"></div>
    </div>
</div>
`,
    // Grid view item
    searchResultsGridViewItem: `
<div class="grid-item grid-product" :data-product-handle="product.urlName" :data-product-id="product.id" :data-usf-pid="product.id">
  <div class="grid-item__content">
      <!--actions -->
      <div v-if="_usfGlobalSettings.quick_add_enable || _usfGlobalSettings.quick_shop_enable" class="grid-product__actions">
          <button v-if="_usfGlobalSettings.quick_shop_enable" class="btn btn--circle btn--icon quick-product__btn quick-product__btn--not-ready small--hide" :class="['js-modal-open-quick-modal-' + product.id]" :title="_usfQuickShopText" tabindex="-1" :data-handle="product.urlName">
              <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-search" viewBox="0 0 64 64">
                  <defs>
                      <style>
                          .cls-1 {
                              fill: none;
                              stroke: #000;
                              stroke-miterlimit: 10;
                              stroke-width: 2px
                          }
                      </style>
                  </defs>
                  <path class="cls-1" d="M47.16 28.58A18.58 18.58 0 1 1 28.58 10a18.58 18.58 0 0 1 18.58 18.58zM54 54L41.94 42" />
              </svg>
              <span class="icon__fallback-text" v-html="_usfQuickShopText"></span>
          </button>
          <template v-if="!isSoldOut && _usfGlobalSettings.quick_add_enable">
              <button v-if="product.variants.length > 1" type="button" class="text-link quick-add-btn js-quick-add-form js-modal-open-quick-add" :title="loc.chooseOptions" tabindex="-1">
                  <span class="btn btn--circle btn--icon">
                      <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-plus" viewBox="0 0 64 64">
                          <path class="cls-1" d="M32 9v46m23-23H9" />
                      </svg>
                      <span class="icon__fallback-text" v-html="loc.chooseOptions"></span>
                  </span>
              </button>
              <button v-else type="button" class="text-link quick-add-btn js-quick-add-btn" :title="_usfAddToCartText" tabindex="-1" :data-id="selectedVariantForPrice.id">
                  <span class="btn btn--circle btn--icon">
                      <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-plus" viewBox="0 0 64 64">
                          <path class="cls-1" d="M32 9v46m23-23H9" />
                      </svg>
                      <span class="icon__fallback-text" v-html="_usfAddToCartText"></span>
                  </span>
              </button>
          </template>
      </div>
      <!--end actions -->

      <a :href="productUrl" @click="onItemClick" @mouseover="onItemHover" @mouseleave="onItemLeave" class="grid-item__link">
          <!-- Wishlist -->
          <usf-plugin name="searchResultsProductWishList" :data="pluginData"></usf-plugin>
          <!-- Labels -->
          <usf-plugin name="searchResultsProductLabel" :data="pluginData"></usf-plugin>
          <div class="grid-product__image-wrap">
              <div class="grid-product__tags">
                  <div v-if="customLabel" class="grid-product__tag grid-product__tag--custom" v-html="customLabel"></div>
                  <template v-else>
                      <div v-if="isSoldOut && usf.settings.search.showSoldOut" class="grid-product__tag grid-product__tag--sold-out" v-html="_usfSoldOutText"></div>
                      <div v-if="!isSoldOut && hasDiscount && usf.settings.search.showSale" class="grid-product__tag grid-product__tag--sale" v-html="_usfSaleText"></div>
                  </template>
               </div>
              <div v-if="_usfGlobalSettings.product_grid_image_size != 'natural'" :class="'grid__image-ratio grid__image-ratio--' + _usfGlobalSettings.product_grid_image_size">
                  <img class="lazyload" :class="{'grid__image-contain':!_usfGlobalSettings.product_grid_image_fill}" :data-src="_usfGetScaledImageUrl(scaledSelectedImageUrl)" :data-widths="'[' + _usfImageWidths + ']'" :data-aspectratio="_usfGetImageRatio(selectedImage)" data-sizes="auto" :alt="selectedImage.alt">
              </div>
              <template v-else>
                  <div :style="'height: 0; padding-bottom:' +100/_usfGetImageRatio(selectedImage) + '%;'">
                      <img class="grid-product__image lazyload" :data-src="_usfGetScaledImageUrl(scaledSelectedImageUrl)" :data-widths="'[' + _usfImageWidths + ']'" :data-aspectratio="_usfGetImageRatio(selectedImage)" data-sizes="auto" :alt="selectedImage.alt">
                  </div>
              </template>
              <div v-if="_usfGlobalSettings.product_hover_image && hoverImage" class="grid-product__secondary-image small--hide">
                  <img class="lazyload" :data-src="_usfGetScaledImageUrl(scaledHoverImageUrl)" :data-widths="'[' + _usfImageWidths + ']'" :data-aspectratio="_usfGetImageRatio(hoverImage)" data-sizes="auto" :alt="hoverImage.alt">
              </div>
              <usf-swatches-1 v-if="_usfGlobalSettings.collection_color_swatches || _usfGlobalSettings.enable_swatches" :product="product"></usf-swatches-1>
          </div>
          <div class="grid-item__meta">
              <div class="grid-item__meta-main">
                  <usf-swatches-2 v-if="_usfGlobalSettings.collection_color_swatches || _usfGlobalSettings.enable_swatches" :product="product"></usf-swatches-2>
                  <div class="grid-product__title" v-html="product.title"></div>
                  <div v-if="_usfGlobalSettings.vendor_enable && usf.settings.search.showVendor" class="grid-product__vendor" v-html="product.vendor"></div>
              </div>
              <div class="grid-item__meta-secondary">
                  <div class="grid-product__price">
                      <span v-if="priceVaries && !product.selectedVariantId" class="grid-product__price--current">
                          <span aria-hidden="true" class="grid-product__price--from" v-html="_usfFromText.replace('{{ price }}',usfGetDisplayPriceWithSup(displayMinDiscountedPrice))"></span>
                          <span class="visually-hidden" v-html="_usfFromText.replace('{{ price }}',displayMinDiscountedPrice)"></span>
                      </span>
                      <template v-else>
                          <span v-if="hasDiscount" class="visually-hidden" v-html="_usfSalePrice"></span>
                          <span class="grid-product__price--current">
                              <span aria-hidden="true" v-html="usfGetDisplayPriceWithSup(displayDiscountedPrice)"></span>
                              <span class="visually-hidden" v-html="displayDiscountedPrice"></span>
                          </span>
                      </template>
                      <template v-if="hasDiscount">
                          <span class="visually-hidden" v-html="_usfRegularPrice"></span>
                          <span class="grid-product__price--original">
                              <span aria-hidden="true" v-html="usfGetDisplayPriceWithSup(priceVaries && !product.selectedVariantId ? displayMinPrice : displayPrice)"></span>
                              <span class="visually-hidden" v-html="priceVaries && !product.selectedVariantId ? displayMinPrice : displayPrice"></span>
                          </span>
                          <template v-if="_usfGlobalSettings.product_save_amount">
                              <span class="grid-product__price--savings">
                                  <template v-if="_usfGlobalSettings.product_save_type == 'dollar'">
                                      <span class="money" v-html="loc.save + ' ' + (priceVaries && !product.selectedVariantId ? _usfMinSalePrice(minPrice,minDiscountedPrice) : displayDiscount)"></span>
                                  </template>
                                  <template v-else>
                                      <template v-if="compareAtPrice && discount">
                                          <span v-html="loc.save + ' ' + (priceVaries && !product.selectedVariantId ? _usfMinSalePercent(minPrice,minDiscountedPrice) : salePercent ) +'%'"></span>
                                      </template>
                                  </template>
                              </span>
                          </template>
                      </template>
                      <div class="usf-unit-price" :data-usf-template="product.urlName"></div>
                  </div>
                    <!-- Swatchs-->
                <usf-plugin name="searchResultsProductSwatch" :data="pluginData"></usf-plugin>
                  <!-- Product review -->
                  <usf-plugin name="searchResultsProductReview" :data="pluginData"></usf-plugin>
              </div>
          </div>
      </a>
  </div>
    <div :id="'QuickShopModal-' + product.id" class="modal modal--square modal--quick-shop" :data-product-id="product.id">
        <div class="modal__inner">
            <div class="modal__centered">
                <div class="modal__centered-content">
                    <div :id="'QuickShopHolder-' + product.urlName"></div>
                </div>
                <button type="button" class="btn btn--circle btn--icon modal__close js-modal-close">
                    <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-close" viewBox="0 0 64 64">
                        <defs>
                            <style>
                                .cls-1 {
                                    fill: none;
                                    stroke: #000;
                                    stroke-miterlimit: 10;
                                    stroke-width: 2px
                                }
                            </style>
                        </defs>
                        <path class="cls-1" d="M19 17.61l27.12 27.13m0-27.13L19 44.74" />
                    </svg>
                    <span class="icon__fallback-text" v-html="_usfCloseModalText"></span>
                </button>
            </div>
        </div>
    </div>
</div>
`,
    // Search result pages
    searchResultsPages: `
<div class="pagination text-center">
    <template v-for="e in elements">
        <span v-if="e.type === 'prev'" class="prev">
            <a href="javascript:void(0)" :title="loc.prevPage" @click="onPrev" class="btn btn--large btn--circle btn--icon"><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-chevron-left" viewBox="0 0 284.49 498.98"><path d="M249.49 0a35 35 0 0 1 24.75 59.75L84.49 249.49l189.75 189.74a35.002 35.002 0 1 1-49.5 49.5L10.25 274.24a35 35 0 0 1 0-49.5L224.74 10.25A34.89 34.89 0 0 1 249.49 0z"></path></svg></a>
        </span>
        <span v-else-if="e.type === 'dots'" class="deco">…</span>
        <span v-else-if="e.type === 'page' && e.current" class="page current">{{e.page}}</span>
        <span v-else-if="e.type === 'page' && !e.current" class="page"><a href="javascript:void(0)" @click="ev=>onPage(e.page,ev)" :title="usf.utils.format(loc.gotoPage,e.page)">{{e.page}}</a></span>
        <span v-else-if="e.type === 'next'" class="next">
            <a href="javascript:void(0)" :title="loc.nextPage" @click="onNext" class="btn btn--large btn--circle btn--icon"><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-chevron-right" viewBox="0 0 284.49 498.98"><path d="M35 498.98a35 35 0 0 1-24.75-59.75l189.74-189.74L10.25 59.75a35.002 35.002 0 0 1 49.5-49.5l214.49 214.49a35 35 0 0 1 0 49.5L59.75 488.73A34.89 34.89 0 0 1 35 498.98z"></path></svg></a>
        </span>
    </template>
</div>
`,
    // List view item
    searchResultsListViewItem: /*inc_begin_search-list-item*/
`<a class="usf-sr-product" @click="onItemClick" @mouseover="onItemHover" @mouseleave="onItemLeave" :href="productUrl" :data-usf-pid="product.id">
    <!-- Image column -->
    <div class="usf-img-column">
        <!-- product image -->
        <div class="usf-img-wrapper usf-sr-product__image-container" :class="{'usf-has-second-img': hoverImage}">
            <div class="usf-main-img lazyload" :data-bgset="_usfGetScaledImageUrl(scaledSelectedImageUrl)" :style="{'background-image': 'url(' + getSelectedImageUrl('600') + ')'}"></div>
            <span class="usf-img-loader"></span>
            <template v-if="hoverImage">
                <div class="usf-second-img lazyload" :data-bgset="_usfGetScaledImageUrl(scaledHoverImageUrl)" :style="{'background-image': 'url(' + getHoverImageUrl('600') + ')'}"></div>
                <span class="usf-img-loader"></span>
            </template>
            <!-- product image extra -->
            <usf-plugin name="searchResultsProductPreview" :data="pluginData"></usf-plugin>
            <usf-plugin name="searchResultsProductCart" :data="pluginData"></usf-plugin>
            
            <div v-if="isSoldOut && usf.settings.search.showSoldOut" class="usf-badge"><span v-html="loc.soldOut"></div>
            <div v-else-if="hasDiscount && usf.settings.search.showSale" class="usf-badge usf-sale-badge"><span v-html="loc.sale"></span></div>
        </div>
    </div>

    <!-- Info column -->
    <div class="usf-info-column">
        <div class="usf-title" v-html="product.title"></div>
        <div class="usf-vendor" v-if="usf.settings.search.showVendor" v-html="product.vendor"></div>

        <!-- price -->
        <usf-plugin name="searchResultsProductPrice" :data="pluginData"></usf-plugin>
        <div class="usf-price-wrapper" :class="{'usf-price--sold-out': isSoldOut}" v-if="!usf.plugins.lastRenderResult" :data-variant-id="product.selectedVariantId">
            <span class="usf-price" :class="{'usf-has-discount': hasDiscount}" v-html="displayPrice"></span>
            <span class="usf-discount" v-if="hasDiscount" v-html="displayDiscountedPrice"></span>
            <span v-if="hasDiscount" class="usf-price-savings" v-html="loc.save + ' ' + salePercent + '%'"></span>
        </div>
        <div class="usf-description"></div>
    </div>
</a>`
/*inc_end_search-list-item*/,
    // AddToCart Plugin	
    addToCartPlugin: ``,

    // Preview Plugin
    previewPlugin: ``,

    previewPluginModal: ``,

    searchResultsBanner: /*inc_begin_search-banner*/        
`<div class="usf-sr-banner">
    <a :href="banner.url || 'javascript:void(0)'" :alt="banner.description">
        <img :src="banner.mediaUrl" style="max-width:100%">
    </a>
</div>
`
/*inc_end_search-banner*/,

    ////////////////////////
    // Filter templates
    // facet filters breadcrumb
    filtersBreadcrumb: /*inc_begin_filters-breadcrumb*/
`<div v-if="usf.settings.filterNavigation.showFilterArea && root.facetFilters && root.facets && facetFilterIds.length" class="usf-refineby">
    <!-- Breadcrumb Header -->
    <div class="usf-title usf-clear">
        <span class="usf-pull-left usf-icon usf-icon-equalizer"></span>
        <span class="usf-label" v-html="loc.filters"></span>

        <!-- Clear all -->
        <button class="usf-clear-all usf-btn" v-html="loc.clearAll" @click.prevent.stop="root.removeAllFacetFilters" :aria-label="loc.clearAllFilters"></button>
    </div>

    <!-- Breadcrumb Values -->
    <div class="usf-refineby__body">
        <template v-for="facetId in facetFilterIds" v-if="(facet = root.facets.find(fc => fc.id === facetId)) && (f = root.facetFilters[facetId])">
            <template v-for="queryValStr in f[1]">
                <div class="usf-refineby__item usf-pointer usf-clear" @click.prevent.stop="root.removeFacetFilter(facetId, queryValStr)">
                    <button class="usf-btn"><span class="usf-filter-label" v-html="facet.title + ': '"></span><b v-html="root.formatBreadcrumbLabel(facet, f[0], queryValStr)"></b></button><span class="usf-remove"></span>
                </div>
            </template>
        </template>
    </div>
 </div>`
 /*inc_end_filters-breadcrumb*/,

    // facet filters    
    filters: /*inc_begin_filters*/
// Vert & Horz modes have different render order
`<div class="usf-facets usf-no-select usf-zone" :class="{'usf-facets--mobile':usf.isMobileFilter}">
<!-- Mobile view -->
<template v-if="usf.isMobile">
    <div class="usf-close" @click="onMobileBack(1)"></div>
    <div class="usf-facets-wrapper">
        <!-- Header. shows 'Filters', facet name, etc. -->
        <div class="usf-header">
            <!-- Single facet mode -->
            <template v-if="isSingleFacetMode">
                <div class="usf-title" @click="onMobileBack(0)" v-html="facets[0].title"></div>
                <div v-if="facetFilters" class="usf-clear" @click="removeAllFacetFilters" v-html="loc.clear"></div>
            </template>

            <!-- When a filter is selected -->
            <template v-else-if="mobileSelectedFacet">
                <div class="usf-title usf-back" @click="onMobileBack(0)" v-html="mobileSelectedFacet.title"></div>
                <div v-if="facetFilters && facetFilters[mobileSelectedFacet.id]" class="usf-clear" @click="removeFacetFilter(mobileSelectedFacet.id)" v-html="loc.clear"></div>
                <div v-else-if="mobileSelectedFacet.multiple" class="usf-all" @click="selectFacetFilter(mobileSelectedFacet)" v-html="loc.all"></div>
            </template>

            <!-- When no filter is selected -->
            <template v-else>
                <div class="usf-title" @click="onMobileBack(0)" v-html="loc.filters"></div>
                <div v-if="facetFilters" class="usf-clear" @click="removeAllFacetFilters" v-html="loc.clearAll"></div>
            </template>
        </div>

        <div class="usf-body">
            <!-- Desktop-like filter in mobile -->
            <template v-if="usf.settings.filters.desktopLikeMobile">
                <usf-filter-breadcrumb></usf-filter-breadcrumb>
                
                <!-- Facets body -->
                <div class="usf-facets__body">
                    <usf-filter :facet="f" :key="f.id" v-for="f in facets"></usf-filter>
                </div>
            </template>
            
            <!-- Mobile filter -->
            <template v-else>
                <!-- List all filter options, in single facet mode -->
                <usf-filter v-if="isSingleFacetMode" :facet="facets[0]"></usf-filter>

                <!-- List all filter options, when a filter is selected -->
                <usf-filter v-else-if="mobileSelectedFacet" :facet="mobileSelectedFacet"></usf-filter>

                <!-- List all when there are more than one facet -->
                <template v-else :key="f.id" v-for="f in facets">
                    <template v-if="canShowFilter(f)">
                        <div class="usf-facet-value" @click="onMobileSelectFacet(f)">
                            <span class="usf-title" v-html="f.title"></span>
                            <div v-if="(selectedFilterOptionValues = facetFilters && (ff = facetFilters[f.id]) ? ff[1] : null)" class="usf-dimmed">
                                <span v-for="cf in selectedFilterOptionValues" v-html="formatBreadcrumbLabel(f, f.facetName, cf)"></span>
                            </div>
                        </div>
                    </template>
                </template>
            </template>
        </div>

        <!-- View items -->
        <div class="usf-footer">
            <div @click="onMobileBack(1)" v-html="loc.viewItems"></div>
        </div>
    </div>
</template>

<!-- Desktop view -->
<template v-else>
    <usf-filter-breadcrumb></usf-filter-breadcrumb>
    <!-- Filters Loader -->
    <div v-if="!facets" class="usf-facets__first-loader">
        <template v-for="i in 3">
            <div class="usf-facet"><div class="usf-title usf-no-select"><span class="usf-label"></span></div>
                <div v-if="!usf.settings.filters.horz" class="usf-container"><div class="usf-facet-values usf-facet-values--List"><div class="usf-relative usf-facet-value usf-facet-value-single"><span class="usf-label"></span><span class="usf-value"></span></div><div class="usf-relative usf-facet-value usf-facet-value-single"><span class="usf-label"></span><span class="usf-value"></span></div></div></div>
            </div>
        </template>
    </div>
    <!-- Facets body -->
    <div v-else class="usf-facets__body">
        <usf-filter :facet="f" :key="f.id" v-for="f in facets"></usf-filter>
    </div>
</template>
</div>`
/*inc_end_filters*/,

    // facet filter item
    filter: /*inc_begin_filter*/
`<div v-if="canShow" class="usf-facet" :class="{'usf-collapsed': collapsed && !usf.isMobileFilter, 'usf-has-filter': isInBreadcrumb}">
    <!-- Mobile filter -->
    <div v-if="usf.isMobileFilter" class="usf-container">
        <!-- Search box -->
        <input v-if="hasSearchBox" class="usf-search-box" :aria-label="loc.filterOptions" :placeholder="loc.filterOptions" :value="term" @input="v => term = v.target.value">

        <!-- Values -->
        ` + _usfFilterBodyTemplate +
    `</div>

    <!-- Desktop filter -->
    <template v-else>
        <!-- Filter title -->
        <div class="usf-clear">
            <div class="usf-title usf-no-select" @click.prevent.stop="onExpandCollapse">
                <button class="usf-label usf-btn" v-html="facet.title" :aria-label="usf.utils.format(loc.filterBy,facet.title)" :aria-expanded="!collapsed"></button>
                <usf-helptip v-if="facet.tooltip" :tooltip="facet.tooltip"></usf-helptip>            
                <!-- 'Clear all' button to clear the current facet filter. -->
                <button v-if="isInBreadcrumb" class="usf-clear-all usf-btn" :title="loc.clearFilterOptions" :aria-label="usf.utils.format(loc.clearFiltersBy,facet.title)" @click.prevent.stop="onClear" v-html="loc.clear"></button>
                <span class="usf-pm"></span>
            </div>
        </div>

        <!-- Filter body -->
        <div class="usf-container">
            <!-- Search box -->
            <input v-if="hasSearchBox" class="usf-search-box" :placeholder="loc.filterOptions" :value="term" @input="v => term = v.target.value">

            ` + _usfFilterBodyTemplate +
        `
        </div>
    </template>
</div>`
/*inc_end_filter*/,

    // facet filter option
    filterOption: /*inc_begin_filter-option*/
`<div v-if="children" :class="(isSelected ? 'usf-selected ' : '') + ' usf-relative usf-facet-value usf-facet-value-single usf-with-children' + (collapsed ? ' usf-collapsed' : '')">
    <!-- option label -->
    <button class="usf-pm usf-btn" v-if="children" @click.prevent.stop="onToggleChildren"></button>
    <button class="usf-label usf-btn" v-html="label" @click.prevent.stop="onToggle"></button>

    <!-- product count -->
    <span v-if="!(!usf.settings.filterNavigation.showProductCount || (swatchImage && !usf.isMobileFilter)) && option.value !== undefined" class="usf-value">{{option.value}}</span>    

    <div class="usf-children-container" v-if="children && !collapsed">
        <button :class="'usf-child-item usf-btn usf-facet-value' + (isChildSelected(c) ? ' usf-selected' : '')" v-for="c in children" v-html="getChildLabel(c)" @click="onChildClick(c)"></span>
    </div>
</div>
<button v-else :class="(isSelected ? 'usf-selected ' : '') + (swatchImage ? ' usf-facet-value--with-background' : '') + ' usf-btn usf-relative usf-facet-value usf-facet-value-' + (facet.multiple ? 'multiple' : 'single')" :title="isSwatch || isBox ? option.label + ' (' + option.value + ')' : undefined" :style="usf.isMobileFilter ? null : swatchStyle" @click.prevent.stop="onToggle">
    <!-- checkbox -->
    <div v-if="!isBox && !isSwatch && facet.multiple" :class="'usf-checkbox' + (isSelected ? ' usf-checked' : '')">
        <span class="usf-checkbox-inner"></span>
    </div>

    <!-- swatch image in mobile -->
    <div v-if="swatchImage && usf.isMobileFilter" class="usf-mobile-swatch" :style="swatchStyle"></div>

    <!-- option label -->
    <span class="usf-label usf-btn" v-html="label"></span>
    
    <!-- product count -->
    <span v-if="!(!usf.settings.filterNavigation.showProductCount || (swatchImage && !usf.isMobileFilter)) && option.value !== undefined" class="usf-value">{{option.value}}</span>
</button>`
/*inc_end_filter-option*/,

    // Instant search popup
    instantSearch: /*inc_begin_instantsearch*/
`<div :class="'usf-popup usf-zone usf-is usf-is--compact usf-is--' + position + (shouldShow ? '' : ' usf-hide') + (isEmpty ? ' usf-empty' : '') + (firstLoader ? ' usf-is--first-loader': '')"  :style="usf.isMobile ? null : {left: this.left + 'px',top: this.top + 'px',width: this.width + 'px'}">
    <!-- Mobile search box -->
    <div v-if="usf.isMobile">
        <form class="usf-is-inputbox" :action="searchUrl" method="get" role="search">
            <span class="usf-icon usf-icon-back usf-close" @click="usf.utils.hideInstantSearch"></span>
            <input name="q" autocomplete="off" ref="searchInput" :value="term" @input="onSearchBoxInput">
            <span class="usf-remove" v-if="term" @click="onClear"></span>
        </form>
    </div>

    <!-- First loader -->
    <div class="usf-is-first-loader" v-if="firstLoader">
        <div class="usf-clear">
            <div class="usf-img"></div>
            <div class="usf-title"></div>
            <div class="usf-subtitle"></div>
        </div>
        <div class="usf-clear">
            <div class="usf-img"></div>
            <div class="usf-title"></div>
            <div class="usf-subtitle"></div>
        </div>
        <div class="usf-clear">
            <div class="usf-img"></div>
            <div class="usf-title"></div>
            <div class="usf-subtitle"></div>
        </div>
    </div>

    <!-- All JS files loaded -->
    <template v-else>
        <!-- Empty view -->
        <div v-if="isEmpty" class="usf-is-no-results">
            <div style="background:url('//cdn.shopify.com/s/files/1/0257/0108/9360/t/85/assets/no-items.png?t=2') center no-repeat;min-height:160px"></div>
            <div v-html="usf.utils.format(loc.noMatchesFoundFor, term)"></div>
        </div>
        <template v-else>
            <!-- Body content -->
            <div class="usf-is-content">
                <!-- Products -->
                <div class="usf-is-matches usf-is-products">
                    <div class="usf-title" v-html="queryOrTerm ? loc.productMatches : loc.trending"></div>
                    
                    <div class="usf-is-list" v-if="result.items.length">
                        <!-- Did you mean -->
                        <span class="usf-is-did-you-mean" v-html="usf.utils.format(loc.didYouMean, usf.utils.encodeHtml(term), result.query)" v-if="termDiffers"></span>

                        <!-- Product -->
                        <usf-is-item v-for="p in result.items" :product="p" :result="result" :key="p.id + '-' + p.selectedVariantId"></usf-is-item>
                    </div>
                    <div class="usf-is-list" v-else style="background:url('//cdn.shopify.com/s/files/1/0257/0108/9360/t/85/assets/no-products.png?t=2') center no-repeat;min-height:250px"></div>
                </div>

                <div class="usf-is-side">
                    <!-- Suggestions -->
                    <div class="usf-is-matches usf-is-suggestions" v-if="result.suggestions && result.suggestions.length">
                        <div class="usf-title" v-html="loc.searchSuggestions"></div>
                        <span v-for="s in result.suggestions" class="usf-is-match" v-html="usf.utils.highlight(s, result.query)" @click="search(s)"></span>
                    </div>

                    <!-- Collections -->
                    <div class="usf-is-matches usf-is-collections" v-if="result.collections && result.collections.length">
                        <div class="usf-title" v-html="loc.collections"></div>
                        <span v-for="c in result.collections" class="usf-is-match" v-html="usf.utils.highlight(c.title, result.query)" @click="selectCollection(c)"></span>
                    </div>

                    <!-- Pages -->
                    <div class="usf-is-matches usf-is-pages" v-if="result.pages && result.pages.length">
                        <div class="usf-title" v-html="loc.pages"></div>
                        <span v-for="p in result.pages" class="usf-is-match" v-html="usf.utils.highlight(p.title, result.query)" @click="selectPage(p)"></span>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="usf-is-viewall">
                <span @click="search(queryOrTerm)" v-html="usf.utils.format(queryOrTerm ? loc.viewAllResultsFor : loc.viewAllResults, queryOrTerm)"></span>
            </div>
        </template>
    </template>
</div>`
/*inc_end_instantsearch*/
,

    // Instant search item
    instantSearchItem:/*inc_begin_instantsearch-item*/
`<span class="usf-is-product usf-clear" @click="onItemClick">
    <!-- Image -->
    <div class="usf-img-wrapper usf-pull-left">
        <img class="usf-img" :src="selectedImageUrl">
    </div>
    
    <div class="usf-pull-left">
        <!-- Title -->
        <div class="usf-title" v-html="usf.utils.highlight(product.title, result.query)"></div>

        <!-- Vendor -->
        <div class="usf-vendor" v-html="product.vendor" v-if="usf.settings.search.showVendor"></div>

        <!-- Prices -->
        <div class="usf-price-wrapper">
            <span class="usf-price" :class="{ 'usf-has-discount': hasDiscount }" v-html="displayPrice"></span>
            <span v-if="hasDiscount" class="usf-discount" v-html="displayDiscountedPrice"></span>
        </div>
    </div>
</span>`
/*inc_end_instantsearch-item*/,
};
function usfGetDisplayPriceWithSup(price) {
    if (!(_usf_money_format.includes('money') || _usf_money_format.includes('.')) && _usfGlobalSettings.superscript_decimals) {
        if (_usf_money_format.includes('{{amount}}') || _usf_money_format.includes('{{ amount }}') || _usf_money_format.includes('{{amount_with_comma_separator}}') || _usf_money_format.includes('{{ amount_with_comma_separator }}')) {
            var n = price.indexOf(usf.settings.decimalDisplay);
            if (n == -1)
                return price + `<sup>00</sup>`
            else
                return price.replace(usf.settings.decimalDisplay, '<sup>') + `</sup>`
        } else
            return price;
    } else
        return price;
}
var _usfMinSalePercent = function (minPrice, minDiscountPrice) {
    if (minDiscountPrice == 0)
        return '100';
    return Math.ceil(100 - minDiscountPrice * 100 / minPrice);
}
var _usfMinSalePrice = function (minPrice, minDiscountPrice) {
    if (minDiscountPrice == 0)
        return usf.utils.getDisplayPrice(minPrice);
    return usf.utils.getDisplayPrice(minPrice - minDiscountPrice);
}
usf.event.add('init', function () {    
	// register or override components
    // ...    
    /*var SearchResultsGridItem2 = {
        template: usf.templates.searchResultsGridViewItem,
    }
    usf.register(SearchResultsGridItem2, usf.components.SearchResultsGridItem, "usf-sr-griditem");*/
    _usfImageWidths = _usfIsDynamicImage ? [200, 400, 600, 700, 800, 900, 1000, 1200] : [usf.settings.search.imageSize];

    //set default settings
    _usfSetDefaultSettings() 

    //get usfFilesUrl
    var nodes = document.head.children;
    for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        if (n.href && (n.href.indexOf('theme.scss.css') !== -1 || n.href.indexOf('theme.css') !== -1)) {
            usfFilesUrl = n.href;
            var m = usfFilesUrl.indexOf('/assets/');
            while (usfFilesUrl[--m] !== '/');
            while (usfFilesUrl[--m] !== '/');
            usfFilesUrl = usfFilesUrl.substring(0, m) + "/files/";
            break;
        }
    }

    var ExpanseGridItem = {
        mixins: [usf.components.SearchResultsGridItem],
        template: usf.templates.searchResultsGridViewItem,
        computed: {
            customLabel() {
                var label;
                this.product.tags.filter(t => {
                    if (t.includes('_label_')) {
                        var tag_starts_with = t.slice(0, 1);
                        if (tag_starts_with == '_') {
                            label = t.replace('_label_','')
                        }
                    }
                })
                return label
            }
        }
    }
    usf.register(ExpanseGridItem, null, "usf-expanse-griditem");

    var UsfSwatches1 = {
        props: {
            product: {
                type: Object,
                required: true
            }
        },
        render(h) {
            var arr = [];
            this.product.options.map((option, option_index) => {
                var option_name = option.name.toLowerCase();
                if (option_name.includes('color') || option_name.includes('colour')) {
                    var values = [];
                    this.product.variants.map((variant) => {
                        if (variant.options[option_index] != undefined) {
                            var value = option.values[variant.options[option_index]];
                            if (!values.includes(value)) {
                                values.push(value);
                                if (this.product.images[variant.imageIndex]) {
                                    arr.push(
                                        h('div', {
                                            staticClass: `grid-product__color-image grid-product__color-image--${variant.id}`
                                        })
                                    )
                                }
                            }
                        }
                    })
                }
            })
            return h('div', arr);
        }
    }
    usf.register(UsfSwatches1, null, 'usf-swatches-1');

    /**
    * color swatch component
    * */
    var UsfSwatches2 = {
        props: {
            product: Object,
        },
        data() {
            var product = this.product;
            var option;
            var option_index = 0;
            var option_with_values = [];
            var optionRendereds = {};
            var selectedOptionValue = '';
            for (let i = 0; i < product.options.length; i++) {
                var o = product.options[i];
                if (o.name.toLowerCase() == _usfSwatchTrigger || o.name.toLowerCase() == 'color' || o.name.toLowerCase() == 'colour') {
                    option_index = i;
                    option = o;
                    break;
                }
            }
            if (option) {
                selectedOptionValue = this.$parent.selectedVariantForPrice.options[option_index] != undefined ? option.values[this.$parent.selectedVariantForPrice.options[option_index]] : '';
                option.values.filter(o => {
                    for (let x = 0; x < product.variants.length; x++) {
                        var v = product.variants[x];
                        if (v.options[option_index] != undefined) {
                            var vrOpt = option.values[v.options[option_index]];
                            var _s = usf.utils.isVariantSoldOut(v);
                            if (o === vrOpt && !optionRendereds[o] && !usf.utils.isVariantSoldOut(v)) {
                                optionRendereds[o] = 1;
                                option_with_values.push({
                                    value: o,
                                    image: product.images[v.imageIndex],
                                    variant: v
                                })
                            }
                        }
                    }
                })
            }
            return {
                option: option,
                option_index: option_index,
                option_with_values: option_with_values,
                selectedOptionValue: selectedOptionValue
            }
        },
        methods: {
            _variantUrl(v) {
                return _usfAddQuery(this.$parent.productUrl, `variant=${v.id}`)
            }
        },
        render(h) {
            if (this.option_with_values.length > 1) return h('div', {
                class: `grid-product__colors`
            }, [
                this.option_with_values.map((o, index) => {
                    var imgUrl, style;
                    var optHandled = _usfHandlezie(o.value);
                    var color_swatch_fallback = _usfHandlezie(o.value.split(' ').pop());
                    var color_image = `${usfFilesUrl}${optHandled}_50x.png`;
                    style = `background-color:${color_swatch_fallback};background-image: url(${color_image})`
                    if (o.image) {
                        imgUrl = _usfGetOriginImgWithSize(o.image.url, '400x');
                    }

                    if (index <= 2) return h('span', {
                        class: `color-swatch color-swatch--small color-swatch--${optHandled} ${o.image ? 'color-swatch--with-image' : ''}`,
                        attrs: {
                            'data-url': this._variantUrl(o.variant),
                            'data-variant-id': o.image ? o.variant.id : false,
                            'data-variant-image': o.image ? imgUrl : false
                        },
                        style: style
                    }, [
                        h('span', {
                            class: 'visually-hidden'
                        }, [o.value])
                    ])
                }),
                this.option_with_values.length > 3 ? h('small', { class: 'color-swatch__more' }, ['+' + (this.option_with_values.length - 3)]) : null
            ])
        }
    }
    usf.register(UsfSwatches2, null, 'usf-swatches-2');

    usf.event.add(['sr_updated', 'sr_viewChanged', 'rerender'], function () {
        setTimeout(function () {
            _usfInit()
        }, 100);
    });


    /**
    * custom filter
    * */
    var ExpanseFilter = {
        mounted() {
            this.$nextTick(function () {
                if (!usf.settings.filters.horz && !usf.isMobile) {
                    var el = this.$el;
                    var drawerZone = document.getElementById('usf_filters')
                    if (drawerZone) {
                        drawerZone.insertBefore(el, drawerZone.firstChild);
                        document.body.classList.add('usf-has-filter-drawer');
                        setTimeout(function () {
                            document.querySelector('.usf-facets__body').addEventListener('click', function () {
                                event.preventDefault()
                            })
                        }, 300)
                    }

                }
            })
        },
        render(h) {
            return h('usf-filters');
        }
    }
    usf.register(ExpanseFilter, null, 'expanse-filter');
});


function _usfInit() {
    theme.sections = new theme.Sections();
    theme.sections.register('collection-template', theme.Collection);
    theme.initGlobals();
    theme.rteInit();
}

function _usfSetDefaultSettings() {

    window._usfGlobalSettings = window._usfGlobalSettings || {
        quick_add_enable: true,
        quick_shop_enable: true,
        product_grid_image_size: "square",
        product_grid_image_fill: true,
        product_hover_image: true,
        collection_color_swatches: false,
        vendor_enable: false,
        superscript_decimals: true,
        product_save_amount: true,
        product_save_type: "dollar",
        enable_swatches: true,
    };
    window._usfProductGridView = window._usfProductGridView || "small";
    window._usfQuickShopText = window._usfQuickShopText || usf.settings.translation.quickView;
    window._usfAddToCartText = window._usfAddToCartText || usf.settings.translation.addToCart;
    window._usfSoldOutText = window._usfSoldOutText || usf.settings.translation.soldOut;
    window._usfSaleText = window._usfSaleText || usf.settings.translation.sale;
    window._usfSwatchTrigger = window._usfSwatchTrigger || "color";
    window._usfRegularPrice = window._usfRegularPrice || "Regular price";
    window._usfSalePrice = window._usfSalePrice || "Sale price";
    window._usf_money_format = window._usf_money_format || theme.settings.moneyFormat;
    window._usfFromText = window._usfFromText || `<span>${usf.settings.translation.from}</span> {{ price }}`;
    window._usfSaveHtml = window._usfSaveHtml || `${usf.settings.translation.save} {{ saved_amount }}`;
    window._usfCloseModalText = "\"Close (esc)\"";
}


/* End custom theme code */
/* Begin common theme code */

// unit test file is js\Source\tests\theme.common_tests.html
var _usfIsDynamicImage = usf.settings.search.imageSizeType === 'dynamic';

// return a list of image URLs for lazyload - TESTED, DONT CHANGE
// used when a theme use `data-srcset` attribute for lazyload.
function _usfGetImageUrls(imageUrl) {
    if (_usfIsDynamicImage)
        // in dynamic image size mode, {size} represents the image size
		return _usfImageWidths.map(w => imageUrl.replace('{size}', w) + ' ' + w + 'w').join(', ')
	
	return _usfImageWidths.map(w => imageUrl + ' ' + w + 'w').join(', ')
}

// used when a theme use `data-src` attribute only for lazyload - TESTED, DONT CHANGE
function _usfGetScaledImageUrl (url, size = '{width}') {
    if (_usfIsDynamicImage)
        return url.replace('{size}', size);
    
    var n = url.lastIndexOf('_');
    if (n === -1)
        return url;

    return url.substr(0, n) + url.substr(n).replace('_' + usf.settings.search.imageSize + 'x', '_' + size + 'x')
}

// get image ratio - TESTED, DONT CHANGE
function _usfGetImageRatio(img){
    return img.width/img.height
}

// get origin image with size (for swatchs...etc..) - TESTED, DONT CHANGE
function _usfGetOriginImgWithSize(url, size = '50x50') {
    var n = url.lastIndexOf(".");
    if (n != -1)
        return url.substring(0, n) + '_' + size + url.substring(n);
    else
        return url
}

// handle string to handle - TESTED, DONT CHANGE
// e.g.: product.title = "Hello Word" => handled: hello-word
function _usfHandlezie (str) {
    var x = str || "";
    return x.toLowerCase().replace("'", '').replace(/[^\w\u00C0-\u024f]+/g, "-").replace(/^-+|-+$/g, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

//split a string according to the number of words
function _usfTruncateWords (str, size = 10, description_words = '...') {
    if (!str)
        return "";
    var arr = str.split(' ', size);	
    if (arr.length < size)
        return str;
    return arr.join(' ') + description_words
}

//split a string according to the number of character
function _usfTruncate(str, size = 100, description_words = '...') {
    if (!str)
        return "";
    if (str.length  && str.length <= size)
        return str;
    return str.slice(0, size - description_words.length) + description_words
}

//split the string at a certain word
//first = true: get string before the word location
//first = false: get string after the word location
//ex: _usfSplitByText(product.description,'[/countdown]') for first || _usfSplitByText(product.description,'[/countdown]',false) for last
function _usfSplitByText(desc, txt,first = true, description_words = '...') {
    var arr = desc.split(txt);
    return first ? arr.shift() + description_words : arr.pop() + description_words
}

// append a query to URL
// ex: _usfAddQuery(productUrl,'view=ajax')
function _usfAddQuery(url, addon) {
    return url + (url.includes('?') ? '&' : '?') + addon
}

function _usfProductHasOnlyDefaultVariant(p) {
    return p.variants.length == 1 && !p.options.length
}

function _usfAddToCart(e, callback) {
    // if _usfDisableAjaxAddToCart is present, use form add to cart instead
    if (window._usfDisableAjaxAddToCart)
        return;
    // prevent bubble
    event.preventDefault();

    // get the `add to cart` btn
    var formElement = event.target.closest('form');
    var addToCartBtn = formElement.querySelector('.usf-add-to-cart-btn');
    var formData = new FormData(formElement)
    // construct form object
    var objectData = {};
    formData.forEach(function (value, key) {
        objectData[key] = value;
    });

    // make the add to cart btn disabled
    addToCartBtn.setAttribute('disabled', 'disabled');
    var clsList = addToCartBtn.classList;
    clsList.remove('usf-is-added');
    clsList.add('usf-with-loader');

    // send request
    fetch(usf.platform.baseUrl + '/cart/add.js', {
        body: JSON.stringify(objectData),
        credentials: 'same-origin',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest' // This is needed as currently there is a bug in Shopify that assumes this header
        }
    }).then(function (response) {
        addToCartBtn.removeAttribute('disabled');
        clsList.remove('usf-with-loader');

        if (callback)
            callback(response);
            
        if (response.ok) {
            clsList.add('usf-is-added');

            response.json().then(rs => typeof _usfOnAddToCartSuccess === "function" ? _usfOnAddToCartSuccess(rs, formElement) : null)
            
            // close the preview modal if any
            var x = document.querySelector('.usf-preview__wrapper .usf-remove');
            if (x) x.click();
        } else {
            response.json().then(function (content) {
                clsList.remove('usf-is-added');

                var errorMsg = content['description'];

                // show error
                var lbl = addToCartBtn.querySelector('.usf-label');
                // if the label has `usf-disable-error` css class, the error message is not written to the label.
                var shouldUpdateLbl = !lbl.classList.contains('usf-disable-error');
                
                if (shouldUpdateLbl) {
                    if (!lbl._oldText)
                        lbl._oldText = lbl.innerHTML;
                    lbl.innerHTML = errorMsg
                }

                clsList.add('usf-has-error');
                setTimeout(function () {
                    if (lbl._oldText)
                        lbl.innerHTML = lbl._oldText

                    clsList.remove('usf-has-error');
                }, 2500);

                typeof _usfOnAddToCartError === "function" ? _usfOnAddToCartError(content, formElement) : null;
            });
        }
    });
}
/* End common theme code */
/*!
 * Ultimate Search and Filter with A.I Power.
 * (c) Jason Dang - sobooster.com
*/
/*!
 * RVue.js v1.0.10
 * (c) Jason Dang
*/
/*!
 * Vue.js v2.6.10
 * (c) 2014-2022 Evan You
 * Released under the MIT License.
 */
!function(e,t){e.RVue=t()}(this,function(){"use strict";var e=Object.freeze({});function t(e){return null==e}function n(e){return null!=e}function r(e){return"string"==typeof e||"number"==typeof e||"symbol"==typeof e||"boolean"==typeof e}function i(e){return null!==e&&"object"==typeof e}var o=Object.prototype.toString;function a(e){return"[object Object]"===o.call(e)}function s(e){var t=parseFloat(String(e));return t>=0&&Math.floor(t)===t&&isFinite(e)}function c(e){return n(e)&&"function"==typeof e.then&&"function"==typeof e.catch}function u(e){return null==e?"":Array.isArray(e)||a(e)&&e.toString===o?JSON.stringify(e,null,2):String(e)}function l(e){var t=parseFloat(e);return isNaN(t)?e:t}function f(e,t){for(var n=Object.create(null),r=e.split(","),i=0;i<r.length;i++)n[r[i]]=!0;return t?function(e){return n[e.toLowerCase()]}:function(e){return n[e]}}var p=f("slot,component",!0),d=f("key,ref,slot,slot-scope,is");function v(e,t){if(e.length){var n=e.indexOf(t);if(n>-1)return e.splice(n,1)}}var h=Object.prototype.hasOwnProperty;function m(e,t){return h.call(e,t)}function y(e){var t=Object.create(null);return function(n){return t[n]||(t[n]=e(n))}}var g=/-(\w)/g,_=y(function(e){return e.replace(g,function(e,t){return t?t.toUpperCase():""})}),b=y(function(e){return e.charAt(0).toUpperCase()+e.slice(1)}),$=/\B([A-Z])/g,w=y(function(e){return e.replace($,"-$1").toLowerCase()});var x=Function.prototype.bind?function(e,t){return e.bind(t)}:function(e,t){function n(n){var r=arguments.length;return r?r>1?e.apply(t,arguments):e.call(t,n):e.call(t)}return n._length=e.length,n};function A(e,t){t=t||0;for(var n=e.length-t,r=new Array(n);n--;)r[n]=e[n+t];return r}function k(e,t){for(var n in t)e[n]=t[n];return e}function O(e){for(var t={},n=0;n<e.length;n++)e[n]&&k(t,e[n]);return t}function C(e,t,n){}var S=function(e,t,n){return!1};function T(e,t){if(e===t)return!0;var n=i(e),r=i(t);if(!n||!r)return!n&&!r&&String(e)===String(t);try{var o=Array.isArray(e),a=Array.isArray(t);if(o&&a)return e.length===t.length&&e.every(function(e,n){return T(e,t[n])});if(e instanceof Date&&t instanceof Date)return e.getTime()===t.getTime();if(o||a)return!1;var s=Object.keys(e),c=Object.keys(t);return s.length===c.length&&s.every(function(n){return T(e[n],t[n])})}catch(e){return!1}}function j(e,t){for(var n=0;n<e.length;n++)if(T(e[n],t))return n;return-1}function N(e){var t=!1;return function(){t||(t=!0,e.apply(this,arguments))}}var D=/a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;function F(e,t,n,r){Object.defineProperty(e,t,{value:n,enumerable:!!r,writable:!0,configurable:!0})}var I=new RegExp("[^"+D.source+".$_\\d]");var M,P="__proto__"in{},E="undefined"!=typeof window,L=E&&window.navigator.userAgent.toLowerCase(),R=L&&L.indexOf("edge/")>0,H=(L&&L.indexOf("android"),L&&/iphone|ipad|ipod|ios/.test(L)),U=(L&&/chrome\/\d+/.test(L),L&&/phantomjs/.test(L),L&&L.match(/firefox\/(\d+)/)),B={}.watch,z=!1;if(E)try{var V={};Object.defineProperty(V,"passive",{get:function(){z=!0}}),window.addEventListener("test-passive",null,V)}catch(e){}var K=function(){return void 0===M&&(M=!E&&"undefined"!=typeof global&&(global.process&&"server"===global.process.env.VUE_ENV)),M};function J(e){return"function"==typeof e&&/native code/.test(e.toString())}var q,Z="undefined"!=typeof Symbol&&J(Symbol)&&"undefined"!=typeof Reflect&&J(Reflect.ownKeys);q="undefined"!=typeof Set&&J(Set)?Set:function(){function e(){this.set=Object.create(null)}return e.prototype.has=function(e){return!0===this.set[e]},e.prototype.add=function(e){this.set[e]=!0},e.prototype.clear=function(){this.set=Object.create(null)},e}();var W="data-server-rendered",G=["component","directive"],Y=["beforeCreate","created","beforeMount","mounted","beforeUpdate","updated","beforeDestroy","destroyed","activated","deactivated","errorCaptured","serverPrefetch"],Q={keyCodes:Object.create(null),isReservedTag:S,isReservedAttr:S,isUnknownElement:S,getTagNamespace:C,parsePlatformTagName:function(e){return e},mustUseProp:S,async:!0,_lifecycleHooks:Y},X=0,ee=function(){this.id=X++,this.subs=[]};ee.prototype.addSub=function(e){this.subs.push(e)},ee.prototype.removeSub=function(e){v(this.subs,e)},ee.prototype.depend=function(){ee.target&&ee.target.addDep(this)},ee.prototype.notify=function(){for(var e=this.subs.slice(),t=0,n=e.length;t<n;t++)e[t].update()},ee.target=null;var te=[];function ne(e){te.push(e),ee.target=e}function re(){te.pop(),ee.target=te[te.length-1]}var ie=function(e,t,n,r,i,o,a,s){this.tag=e,this.data=t,this.children=n,this.text=r,this.elm=i,this.ns=void 0,this.context=o,this.fnContext=void 0,this.fnOptions=void 0,this.fnScopeId=void 0,this.key=t&&t.key,this.componentOptions=a,this.componentInstance=void 0,this.parent=void 0,this.raw=!1,this.isStatic=!1,this.isRootInsert=!0,this.isComment=!1,this.isCloned=!1,this.isOnce=!1,this.asyncFactory=s,this.asyncMeta=void 0,this.isAsyncPlaceholder=!1},oe={child:{configurable:!0}};oe.child.get=function(){return this.componentInstance},Object.defineProperties(ie.prototype,oe);var ae=function(e){void 0===e&&(e="");var t=new ie;return t.text=e,t.isComment=!0,t};function se(e){return new ie(void 0,void 0,void 0,String(e))}function ce(e){var t=new ie(e.tag,e.data,e.children&&e.children.slice(),e.text,e.elm,e.context,e.componentOptions,e.asyncFactory);return t.ns=e.ns,t.isStatic=e.isStatic,t.key=e.key,t.isComment=e.isComment,t.fnContext=e.fnContext,t.fnOptions=e.fnOptions,t.fnScopeId=e.fnScopeId,t.asyncMeta=e.asyncMeta,t.isCloned=!0,t}var ue=Array.prototype,le=Object.create(ue);["push","pop","shift","unshift","splice","sort","reverse"].forEach(function(e){var t=ue[e];F(le,e,function(){for(var n=[],r=arguments.length;r--;)n[r]=arguments[r];var i,o=t.apply(this,n),a=this.__ob__;switch(e){case"push":case"unshift":i=n;break;case"splice":i=n.slice(2)}return i&&a.observeArray(i),a.dep.notify(),o})});var fe=Object.getOwnPropertyNames(le),pe=!0;function de(e){pe=e}var ve=function(e){var t;this.value=e,this.dep=new ee,this.vmCount=0,F(e,"__ob__",this),Array.isArray(e)?(P?(t=le,e.__proto__=t):function(e,t,n){for(var r=0,i=n.length;r<i;r++){var o=n[r];F(e,o,t[o])}}(e,le,fe),this.observeArray(e)):this.walk(e)};function he(e,t){var n;if(i(e)&&!(e instanceof ie))return m(e,"__ob__")&&e.__ob__ instanceof ve?n=e.__ob__:pe&&!K()&&(Array.isArray(e)||a(e))&&Object.isExtensible(e)&&!e._isVue&&(n=new ve(e)),t&&n&&n.vmCount++,n}function me(e,t,n,r,i){var o=new ee,a=Object.getOwnPropertyDescriptor(e,t);if(!a||!1!==a.configurable){var s=a&&a.get,c=a&&a.set;s&&!c||2!==arguments.length||(n=e[t]);var u=!i&&he(n);Object.defineProperty(e,t,{enumerable:!0,configurable:!0,get:function(){var t=s?s.call(e):n;return ee.target&&(o.depend(),u&&(u.dep.depend(),Array.isArray(t)&&function e(t){for(var n=void 0,r=0,i=t.length;r<i;r++)(n=t[r])&&n.__ob__&&n.__ob__.dep.depend(),Array.isArray(n)&&e(n)}(t))),t},set:function(t){var r=s?s.call(e):n;t===r||t!=t&&r!=r||s&&!c||(c?c.call(e,t):n=t,u=!i&&he(t),o.notify())}})}}function ye(e,t,n){if(Array.isArray(e)&&s(t))return e.length=Math.max(e.length,t),e.splice(t,1,n),n;if(t in e&&!(t in Object.prototype))return e[t]=n,n;var r=e.__ob__;return e._isVue||r&&r.vmCount?n:r?(me(r.value,t,n),r.dep.notify(),n):(e[t]=n,n)}function ge(e,t){if(Array.isArray(e)&&s(t))e.splice(t,1);else{var n=e.__ob__;e._isVue||n&&n.vmCount||m(e,t)&&(delete e[t],n&&n.dep.notify())}}ve.prototype.walk=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)me(e,t[n])},ve.prototype.observeArray=function(e){for(var t=0,n=e.length;t<n;t++)he(e[t])};var _e=Object.create(null);function be(e,t){if(!t)return e;for(var n,r,i,o=Z?Reflect.ownKeys(t):Object.keys(t),s=0;s<o.length;s++)"__ob__"!==(n=o[s])&&(r=e[n],i=t[n],m(e,n)?r!==i&&a(r)&&a(i)&&be(r,i):ye(e,n,i));return e}function $e(e,t,n){return n?function(){var r="function"==typeof t?t.call(n,n):t,i="function"==typeof e?e.call(n,n):e;return r?be(r,i):i}:t?e?function(){return be("function"==typeof t?t.call(this,this):t,"function"==typeof e?e.call(this,this):e)}:t:e}function we(e,t){var n=t?e?e.concat(t):Array.isArray(t)?t:[t]:e;return n?function(e){for(var t=[],n=0;n<e.length;n++)-1===t.indexOf(e[n])&&t.push(e[n]);return t}(n):n}_e.data=function(e,t,n){return n?$e(e,t,n):t&&"function"!=typeof t?e:$e(e,t)};for(var xe=0;xe<Y.length;xe++)_e[Y[xe]]=we;function Ae(e,t,n,r){var i=Object.create(e||null);return t?k(i,t):i}for(var ke=0;ke<G.length;ke++)_e[G[ke]+"s"]=Ae;_e.watch=function(e,t,n,r){if(e===B&&(e=void 0),t===B&&(t=void 0),!t)return Object.create(e||null);if(!e)return t;var i={};for(var o in k(i,e),t){var a=i[o],s=t[o];a&&!Array.isArray(a)&&(a=[a]),i[o]=a?a.concat(s):Array.isArray(s)?s:[s]}return i},_e.props=_e.methods=_e.inject=_e.computed=function(e,t,n,r){if(!e)return t;var i=Object.create(null);return k(i,e),t&&k(i,t),i},_e.provide=$e;var Oe=function(e,t){return void 0===t?e:t};function Ce(e,t,n){if("function"==typeof t&&(t=t.options),function(e,t){var n=e.props;if(n){var r,i,o={};if(Array.isArray(n))for(r=n.length;r--;)"string"==typeof(i=n[r])&&(o[_(i)]={type:null});else if(a(n))for(var s in n)i=n[s],o[_(s)]=a(i)?i:{type:i};e.props=o}}(t),function(e,t){var n=e.inject;if(n){var r=e.inject={};if(Array.isArray(n))for(var i=0;i<n.length;i++)r[n[i]]={from:n[i]};else if(a(n))for(var o in n){var s=n[o];r[o]=a(s)?k({from:o},s):{from:s}}}}(t),function(e){var t=e.directives;if(t)for(var n in t){var r=t[n];"function"==typeof r&&(t[n]={bind:r,update:r})}}(t),!t._base&&(t.extends&&(e=Ce(e,t.extends,n)),t.mixins))for(var r=0,i=t.mixins.length;r<i;r++)e=Ce(e,t.mixins[r],n);var o,s={};for(o in e)c(o);for(o in t)m(e,o)||c(o);function c(r){var i=_e[r]||Oe;s[r]=i(e[r],t[r],n,r)}return s}function Se(e,t,n,r){if("string"==typeof n){var i=e[t];if(m(i,n))return i[n];var o=_(n);if(m(i,o))return i[o];var a=b(o);return m(i,a)?i[a]:i[n]||i[o]||i[a]}}function Te(e,t,n,r){var i=t[e],o=!m(n,e),a=n[e],s=De(Boolean,i.type);if(s>-1)if(o&&!m(i,"default"))a=!1;else if(""===a||a===w(e)){var c=De(String,i.type);(c<0||s<c)&&(a=!0)}if(void 0===a){a=function(e,t,n){if(!m(t,"default"))return;var r=t.default;if(e&&e.$options.propsData&&void 0===e.$options.propsData[n]&&void 0!==e._props[n])return e._props[n];return"function"==typeof r&&"Function"!==je(t.type)?r.call(e):r}(r,i,e);var u=pe;de(!0),he(a),de(u)}return a}function je(e){var t=e&&e.toString().match(/^\s*function (\w+)/);return t?t[1]:""}function Ne(e,t){return je(e)===je(t)}function De(e,t){if(!Array.isArray(t))return Ne(t,e)?0:-1;for(var n=0,r=t.length;n<r;n++)if(Ne(t[n],e))return n;return-1}function Fe(e,t,n){ne();try{if(t)for(var r=t;r=r.$parent;){var i=r.$options.errorCaptured;if(i)for(var o=0;o<i.length;o++)try{if(!1===i[o].call(r,e,t,n))return}catch(e){Me(e,r,"errorCaptured hook")}}Me(e,t,n)}finally{re()}}function Ie(e,t,n,r,i){var o;try{(o=n?e.apply(t,n):e.call(t))&&!o._isVue&&c(o)&&!o._handled&&(o.catch(function(e){return Fe(e,r,i+" (Promise/async)")}),o._handled=!0)}catch(e){Fe(e,r,i)}return o}function Me(e,t,n){!function(e,t,n){if(!E||"undefined"==typeof console)throw e;console.error(e)}(e)}var Pe,Ee=!1,Le=[],Re=!1;function He(){Re=!1;var e=Le.slice(0);Le.length=0;for(var t=0;t<e.length;t++)e[t]()}if("undefined"!=typeof Promise&&J(Promise)){var Ue=Promise.resolve();Pe=function(){Ue.then(He),H&&setTimeout(C)},Ee=!0}else if("undefined"==typeof MutationObserver||!J(MutationObserver)&&"[object MutationObserverConstructor]"!==MutationObserver.toString())Pe="undefined"!=typeof setImmediate&&J(setImmediate)?function(){setImmediate(He)}:function(){setTimeout(He,0)};else{var Be=1,ze=new MutationObserver(He),Ve=document.createTextNode(String(Be));ze.observe(Ve,{characterData:!0}),Pe=function(){Be=(Be+1)%2,Ve.data=String(Be)},Ee=!0}function Ke(e,t){var n;if(Le.push(function(){if(e)try{e.call(t)}catch(e){Fe(e,t,"nextTick")}else n&&n(t)}),Re||(Re=!0,Pe()),!e&&"undefined"!=typeof Promise)return new Promise(function(e){n=e})}var Je=new q;function qe(e){!function e(t,n){var r,o;var a=Array.isArray(t);if(!a&&!i(t)||Object.isFrozen(t)||t instanceof ie)return;if(t.__ob__){var s=t.__ob__.dep.id;if(n.has(s))return;n.add(s)}if(a)for(r=t.length;r--;)e(t[r],n);else for(o=Object.keys(t),r=o.length;r--;)e(t[o[r]],n)}(e,Je),Je.clear()}var Ze=y(function(e){var t="&"===e.charAt(0),n="~"===(e=t?e.slice(1):e).charAt(0),r="!"===(e=n?e.slice(1):e).charAt(0);return{name:e=r?e.slice(1):e,once:n,capture:r,passive:t}});function We(e,t){function n(){var e=arguments,r=n.fns;if(!Array.isArray(r))return Ie(r,null,arguments,t,"v-on handler");for(var i=r.slice(),o=0;o<i.length;o++)Ie(i[o],null,e,t,"v-on handler")}return n.fns=e,n}function Ge(e,n,r,i,o,a){var s,c,u,l;for(s in e)c=e[s],u=n[s],l=Ze(s),t(c)||(t(u)?(t(c.fns)&&(c=e[s]=We(c,a)),!0===l.once&&(c=e[s]=o(l.name,c,l.capture)),r(l.name,c,l.capture,l.passive,l.params)):c!==u&&(u.fns=c,e[s]=u));for(s in n)t(e[s])&&i((l=Ze(s)).name,n[s],l.capture)}function Ye(e,r,i){var o;e instanceof ie&&(e=e.data.hook||(e.data.hook={}));var a=e[r];function s(){i.apply(this,arguments),v(o.fns,s)}t(a)?o=We([s]):n(a.fns)&&!0===a.merged?(o=a).fns.push(s):o=We([a,s]),o.merged=!0,e[r]=o}function Qe(e,t,r,i,o){if(n(t)){if(m(t,r))return e[r]=t[r],o||delete t[r],!0;if(m(t,i))return e[r]=t[i],o||delete t[i],!0}return!1}function Xe(e){return r(e)?[se(e)]:Array.isArray(e)?function e(i,o){var a=[];var s,c,u,l;for(s=0;s<i.length;s++)t(c=i[s])||"boolean"==typeof c||(u=a.length-1,l=a[u],Array.isArray(c)?c.length>0&&(et((c=e(c,(o||"")+"_"+s))[0])&&et(l)&&(a[u]=se(l.text+c[0].text),c.shift()),a.push.apply(a,c)):r(c)?et(l)?a[u]=se(l.text+c):""!==c&&a.push(se(c)):et(c)&&et(l)?a[u]=se(l.text+c.text):(!0===i._isVList&&n(c.tag)&&t(c.key)&&n(o)&&(c.key="__vlist"+o+"_"+s+"__"),a.push(c)));return a}(e):void 0}function et(e){return n(e)&&n(e.text)&&!1===e.isComment}function tt(e,t){if(e){for(var n=Object.create(null),r=Z?Reflect.ownKeys(e):Object.keys(e),i=0;i<r.length;i++){var o=r[i];if("__ob__"!==o){for(var a=e[o].from,s=t;s;){if(s._provided&&m(s._provided,a)){n[o]=s._provided[a];break}s=s.$parent}if(!s&&"default"in e[o]){var c=e[o].default;n[o]="function"==typeof c?c.call(t):c}}}return n}}function nt(e,t){if(!e||!e.length)return{};for(var n={},r=0,i=e.length;r<i;r++){var o=e[r],a=o.data;if(a&&a.attrs&&a.attrs.slot&&delete a.attrs.slot,o.context!==t&&o.fnContext!==t||!a||null==a.slot)(n.default||(n.default=[])).push(o);else{var s=a.slot,c=n[s]||(n[s]=[]);"template"===o.tag?c.push.apply(c,o.children||[]):c.push(o)}}for(var u in n)n[u].every(rt)&&delete n[u];return n}function rt(e){return e.isComment&&!e.asyncFactory||" "===e.text}function it(t,n,r){var i,o=Object.keys(n).length>0,a=t?!!t.$stable:!o,s=t&&t.$key;if(t){if(t._normalized)return t._normalized;if(a&&r&&r!==e&&s===r.$key&&!o&&!r.$hasNormal)return r;for(var c in i={},t)t[c]&&"$"!==c[0]&&(i[c]=ot(n,c,t[c]))}else i={};for(var u in n)u in i||(i[u]=at(n,u));return t&&Object.isExtensible(t)&&(t._normalized=i),F(i,"$stable",a),F(i,"$key",s),F(i,"$hasNormal",o),i}function ot(e,t,n){var r=function(){var e=arguments.length?n.apply(null,arguments):n({});return(e=e&&"object"==typeof e&&!Array.isArray(e)?[e]:Xe(e))&&(0===e.length||1===e.length&&e[0].isComment)?void 0:e};return n.proxy&&Object.defineProperty(e,t,{get:r,enumerable:!0,configurable:!0}),r}function at(e,t){return function(){return e[t]}}function st(e,t){var r,o,a,s,c;if(Array.isArray(e)||"string"==typeof e)for(r=new Array(e.length),o=0,a=e.length;o<a;o++)r[o]=t(e[o],o);else if("number"==typeof e)for(r=new Array(e),o=0;o<e;o++)r[o]=t(o+1,o);else if(i(e))if(Z&&e[Symbol.iterator]){r=[];for(var u=e[Symbol.iterator](),l=u.next();!l.done;)r.push(t(l.value,r.length)),l=u.next()}else for(s=Object.keys(e),r=new Array(s.length),o=0,a=s.length;o<a;o++)c=s[o],r[o]=t(e[c],c,o);return n(r)||(r=[]),r._isVList=!0,r}function ct(e,t,n,r){var i,o=this.$scopedSlots[e];o?(n=n||{},r&&(n=k(k({},r),n)),i=o(n)||t):i=this.$slots[e]||t;var a=n&&n.slot;return a?this.$createElement("template",{slot:a},i):i}function ut(e,t){return Array.isArray(e)?-1===e.indexOf(t):e!==t}function lt(e,t,n,r,i){var o=Q.keyCodes[t]||n;return i&&r&&!Q.keyCodes[t]?ut(i,r):o?ut(o,e):r?w(r)!==t:void 0}function ft(e,t,n,r,o){if(n)if(i(n)){var a;Array.isArray(n)&&(n=O(n));var s=function(i){if("class"===i||"style"===i||d(i))a=e;else{var s=e.attrs&&e.attrs.type;a=r||Q.mustUseProp(t,s,i)?e.domProps||(e.domProps={}):e.attrs||(e.attrs={})}var c=_(i),u=w(i);c in a||u in a||(a[i]=n[i],o&&((e.on||(e.on={}))["update:"+i]=function(e){n[i]=e}))};for(var c in n)s(c)}else;return e}function pt(e,t){var n=this._staticTrees||(this._staticTrees=[]),r=n[e];return r&&!t?r:(vt(r=n[e]=this.$options.staticRenderFns[e].call(this._renderProxy,null,this),"__static__"+e,!1),r)}function dt(e,t,n){return vt(e,"__once__"+t+(n?"_"+n:""),!0),e}function vt(e,t,n){if(Array.isArray(e))for(var r=0;r<e.length;r++)e[r]&&"string"!=typeof e[r]&&ht(e[r],t+"_"+r,n);else ht(e,t,n)}function ht(e,t,n){e.isStatic=!0,e.key=t,e.isOnce=n}function mt(e,t){if(t)if(a(t)){var n=e.on=e.on?k({},e.on):{};for(var r in t){var i=n[r],o=t[r];n[r]=i?[].concat(i,o):o}}else;return e}function yt(e,t,n,r){t=t||{$stable:!n};for(var i=0;i<e.length;i++){var o=e[i];Array.isArray(o)?yt(o,t,n):o&&(o.proxy&&(o.fn.proxy=!0),t[o.key]=o.fn)}return r&&(t.$key=r),t}function gt(e,t){for(var n=0;n<t.length;n+=2){var r=t[n];"string"==typeof r&&r&&(e[t[n]]=t[n+1])}return e}function _t(e,t){return"string"==typeof e?t+e:e}function bt(e){e._o=dt,e._n=l,e._s=u,e._l=st,e._t=ct,e._q=T,e._i=j,e._m=pt,e._k=lt,e._b=ft,e._v=se,e._e=ae,e._u=yt,e._g=mt,e._d=gt,e._p=_t}function $t(t,n,r,i,o){var a,s=this,c=o.options;m(i,"_uid")?(a=Object.create(i))._original=i:(a=i,i=i._original);var u=!0===c._compiled,l=!u;this.data=t,this.props=n,this.children=r,this.parent=i,this.listeners=t.on||e,this.injections=tt(c.inject,i),this.slots=function(){return s.$slots||it(t.scopedSlots,s.$slots=nt(r,i)),s.$slots},Object.defineProperty(this,"scopedSlots",{enumerable:!0,get:function(){return it(t.scopedSlots,this.slots())}}),u&&(this.$options=c,this.$slots=this.slots(),this.$scopedSlots=it(t.scopedSlots,this.$slots)),c._scopeId?this._c=function(e,t,n,r){var o=jt(a,e,t,n,r,l);return o&&!Array.isArray(o)&&(o.fnScopeId=c._scopeId,o.fnContext=i),o}:this._c=function(e,t,n,r){return jt(a,e,t,n,r,l)}}function wt(e,t,n,r){var i=ce(e);return i.fnContext=n,i.fnOptions=r,t.slot&&((i.data||(i.data={})).slot=t.slot),i}function xt(e,t){for(var n in t)e[_(n)]=t[n]}bt($t.prototype);var At={init:function(e,t){if(e.componentInstance&&!e.componentInstance._isDestroyed){var r=e;At.prepatch(r,r)}else{(e.componentInstance=function(e,t){var r={_isComponent:!0,_parentVnode:e,parent:t},i=e.data.inlineTemplate;n(i)&&(r.render=i.render,r.staticRenderFns=i.staticRenderFns);return new e.componentOptions.Ctor(r)}(e,Lt)).$mount(t?e.elm:void 0,t)}},prepatch:function(t,n){var r=n.componentOptions;!function(t,n,r,i,o){var a=i.data.scopedSlots,s=t.$scopedSlots,c=!!(a&&!a.$stable||s!==e&&!s.$stable||a&&t.$scopedSlots.$key!==a.$key),u=!!(o||t.$options._renderChildren||c);t.$options._parentVnode=i,t.$vnode=i,t._vnode&&(t._vnode.parent=i);if(t.$options._renderChildren=o,t.$attrs=i.data.attrs||e,t.$listeners=r||e,n&&t.$options.props){de(!1);for(var l=t._props,f=t.$options._propKeys||[],p=0;p<f.length;p++){var d=f[p],v=t.$options.props;l[d]=Te(d,v,n,t)}de(!0),t.$options.propsData=n}r=r||e;var h=t.$options._parentListeners;t.$options._parentListeners=r,Et(t,r,h),u&&(t.$slots=nt(o,i.context),t.$forceUpdate())}(n.componentInstance=t.componentInstance,r.propsData,r.listeners,n,r.children)},insert:function(e){e.context;var t=e.componentInstance;t._isMounted||(t._isMounted=!0,Ht(t,"mounted"))},destroy:function(e){var t=e.componentInstance;t._isDestroyed||t.$destroy()}},kt=Object.keys(At);function Ot(r,o,a,s,u){if(!t(r)){var l=a.$options._base;if(i(r)&&(r=l.extend(r)),"function"==typeof r){var f;if(t(r.cid)&&void 0===(r=function(e,r){if(!0===e.error&&n(e.errorComp))return e.errorComp;if(n(e.resolved))return e.resolved;var o=Dt;o&&n(e.owners)&&-1===e.owners.indexOf(o)&&e.owners.push(o);if(!0===e.loading&&n(e.loadingComp))return e.loadingComp;if(o&&!n(e.owners)){var a=e.owners=[o],s=!0,u=null,l=null;o.$on("hook:destroyed",function(){return v(a,o)});var f=function(e){for(var t=0,n=a.length;t<n;t++)a[t].$forceUpdate();e&&(a.length=0,null!==u&&(clearTimeout(u),u=null),null!==l&&(clearTimeout(l),l=null))},p=N(function(t){e.resolved=Ft(t,r),s?a.length=0:f(!0)}),d=N(function(t){n(e.errorComp)&&(e.error=!0,f(!0))}),h=e(p,d);return i(h)&&(c(h)?t(e.resolved)&&h.then(p,d):c(h.component)&&(h.component.then(p,d),n(h.error)&&(e.errorComp=Ft(h.error,r)),n(h.loading)&&(e.loadingComp=Ft(h.loading,r),0===h.delay?e.loading=!0:u=setTimeout(function(){u=null,t(e.resolved)&&t(e.error)&&(e.loading=!0,f(!1))},h.delay||200)),n(h.timeout)&&(l=setTimeout(function(){l=null,t(e.resolved)&&d(null)},h.timeout)))),s=!1,e.loading?e.loadingComp:e.resolved}}(f=r,l)))return function(e,t,n,r,i){var o=ae();return o.asyncFactory=e,o.asyncMeta={data:t,context:n,children:r,tag:i},o}(f,o,a,s,u);o=o||{},un(r),n(o.model)&&function(e,t){var r=e.model&&e.model.prop||"value",i=e.model&&e.model.event||"input";(t.attrs||(t.attrs={}))[r]=t.model.value;var o=t.on||(t.on={}),a=o[i],s=t.model.callback;n(a)?(Array.isArray(a)?-1===a.indexOf(s):a!==s)&&(o[i]=[s].concat(a)):o[i]=s}(r.options,o);var p=function(e,r,i){var o=r.options.props;if(!t(o)){var a={},s=e.attrs,c=e.props;if(n(s)||n(c))for(var u in o){var l=w(u);Qe(a,c,u,l,!0)||Qe(a,s,u,l,!1)}return a}}(o,r);if(!0===r.options.functional)return function(t,r,i,o,a){var s=t.options,c={},u=s.props;if(n(u))for(var l in u)c[l]=Te(l,u,r||e);else n(i.attrs)&&xt(c,i.attrs),n(i.props)&&xt(c,i.props);var f=new $t(i,c,a,o,t),p=s.render.call(null,f._c,f);if(p instanceof ie)return wt(p,i,f.parent,s);if(Array.isArray(p)){for(var d=Xe(p)||[],v=new Array(d.length),h=0;h<d.length;h++)v[h]=wt(d[h],i,f.parent,s);return v}}(r,p,o,a,s);var d=o.on;if(o.on=o.nativeOn,!0===r.options.abstract){var h=o.slot;o={},h&&(o.slot=h)}!function(e){for(var t=e.hook||(e.hook={}),n=0;n<kt.length;n++){var r=kt[n],i=t[r],o=At[r];i===o||i&&i._merged||(t[r]=i?Ct(o,i):o)}}(o);var m=r.options.name||u;return new ie("vue-component-"+r.cid+(m?"-"+m:""),o,void 0,void 0,void 0,a,{Ctor:r,propsData:p,listeners:d,tag:u,children:s},f)}}}function Ct(e,t){var n=function(n,r){e(n,r),t(n,r)};return n._merged=!0,n}var St=1,Tt=2;function jt(e,o,a,s,c,u){return(Array.isArray(a)||r(a))&&(c=s,s=a,a=void 0),!0===u&&(c=Tt),function(e,r,o,a,s){if(n(o)&&n(o.__ob__))return ae();n(o)&&n(o.is)&&(r=o.is);if(!r)return ae();Array.isArray(a)&&"function"==typeof a[0]&&((o=o||{}).scopedSlots={default:a[0]},a.length=0);s===Tt?a=Xe(a):s===St&&(a=function(e){for(var t=0;t<e.length;t++)if(Array.isArray(e[t]))return Array.prototype.concat.apply([],e);return e}(a));var c,u;if("string"==typeof r){var l;u=e.$vnode&&e.$vnode.ns||Q.getTagNamespace(r),c=Q.isReservedTag(r)?new ie(Q.parsePlatformTagName(r),o,a,void 0,void 0,e):o&&o.pre||!n(l=Se(e.$options,"components",r))?new ie(r,o,a,void 0,void 0,e):Ot(l,o,e,a,r)}else c=Ot(r,o,e,a);return Array.isArray(c)?c:n(c)?(n(u)&&function e(r,i,o){r.ns=i;"foreignObject"===r.tag&&(i=void 0,o=!0);if(n(r.children))for(var a=0,s=r.children.length;a<s;a++){var c=r.children[a];n(c.tag)&&(t(c.ns)||!0===o&&"svg"!==c.tag)&&e(c,i,o)}}(c,u),n(o)&&function(e){i(e.style)&&qe(e.style);i(e.class)&&qe(e.class)}(o),c):ae()}(e,o,a,s,c)}var Nt,Dt=null;function Ft(e,t){return(e.__esModule||Z&&"Module"===e[Symbol.toStringTag])&&(e=e.default),i(e)?t.extend(e):e}function It(e,t){Nt.$on(e,t)}function Mt(e,t){Nt.$off(e,t)}function Pt(e,t){var n=Nt;return function r(){null!==t.apply(null,arguments)&&n.$off(e,r)}}function Et(e,t,n){Nt=e,Ge(t,n||{},It,Mt,Pt,e),Nt=void 0}var Lt=null;function Rt(e,t){if(t){if(e._directInactive=!1,function(e){for(;e&&(e=e.$parent);)if(e._inactive)return!0;return!1}(e))return}else if(e._directInactive)return;if(e._inactive||null===e._inactive){e._inactive=!1;for(var n=0;n<e.$children.length;n++)Rt(e.$children[n]);Ht(e,"activated")}}function Ht(e,t){ne();var n=e.$options[t],r=t+" hook";if(n)for(var i=0,o=n.length;i<o;i++)Ie(n[i],e,null,e,r);e._hasHookEvent&&e.$emit("hook:"+t),re()}var Ut=[],Bt=[],zt={},Vt=!1,Kt=!1,Jt=0;var qt=0,Zt=Date.now;if(E){var Wt=window.performance;Wt&&"function"==typeof Wt.now&&Zt()>document.createEvent("Event").timeStamp&&(Zt=function(){return Wt.now()})}function Gt(){var e,t;for(qt=Zt(),Kt=!0,Ut.sort(function(e,t){return e.id-t.id}),Jt=0;Jt<Ut.length;Jt++)(e=Ut[Jt]).before&&e.before(),t=e.id,zt[t]=null,e.run();var n=Bt.slice(),r=Ut.slice();Jt=Ut.length=Bt.length=0,zt={},Vt=Kt=!1,function(e){for(var t=0;t<e.length;t++)e[t]._inactive=!0,Rt(e[t],!0)}(n),function(e){var t=e.length;for(;t--;){var n=e[t],r=n.vm;r._watcher===n&&r._isMounted&&!r._isDestroyed&&Ht(r,"updated")}}(r)}var Yt=0,Qt=function(e,t,n,r,i){this.vm=e,i&&(e._watcher=this),e._watchers.push(this),r?(this.deep=!!r.deep,this.user=!!r.user,this.lazy=!!r.lazy,this.sync=!!r.sync,this.before=r.before):this.deep=this.user=this.lazy=this.sync=!1,this.cb=n,this.id=++Yt,this.active=!0,this.dirty=this.lazy,this.deps=[],this.newDeps=[],this.depIds=new q,this.newDepIds=new q,this.expression="","function"==typeof t?this.getter=t:(this.getter=function(e){if(!I.test(e)){var t=e.split(".");return function(e){for(var n=0;n<t.length;n++){if(!e)return;e=e[t[n]]}return e}}}(t),this.getter||(this.getter=C)),this.value=this.lazy?void 0:this.get()};Qt.prototype.get=function(){var e;ne(this);var t=this.vm;try{e=this.getter.call(t,t)}catch(e){if(!this.user)throw e;Fe(e,t,'getter for watcher "'+this.expression+'"')}finally{this.deep&&qe(e),re(),this.cleanupDeps()}return e},Qt.prototype.addDep=function(e){var t=e.id;this.newDepIds.has(t)||(this.newDepIds.add(t),this.newDeps.push(e),this.depIds.has(t)||e.addSub(this))},Qt.prototype.cleanupDeps=function(){for(var e=this.deps.length;e--;){var t=this.deps[e];this.newDepIds.has(t.id)||t.removeSub(this)}var n=this.depIds;this.depIds=this.newDepIds,this.newDepIds=n,this.newDepIds.clear(),n=this.deps,this.deps=this.newDeps,this.newDeps=n,this.newDeps.length=0},Qt.prototype.update=function(){this.lazy?this.dirty=!0:this.sync?this.run():function(e){var t=e.id;if(null==zt[t]){if(zt[t]=!0,Kt){for(var n=Ut.length-1;n>Jt&&Ut[n].id>e.id;)n--;Ut.splice(n+1,0,e)}else Ut.push(e);Vt||(Vt=!0,Ke(Gt))}}(this)},Qt.prototype.run=function(){if(this.active){var e=this.get();if(e!==this.value||i(e)||this.deep){var t=this.value;if(this.value=e,this.user)try{this.cb.call(this.vm,e,t)}catch(e){Fe(e,this.vm,'callback for watcher "'+this.expression+'"')}else this.cb.call(this.vm,e,t)}}},Qt.prototype.evaluate=function(){this.value=this.get(),this.dirty=!1},Qt.prototype.depend=function(){for(var e=this.deps.length;e--;)this.deps[e].depend()},Qt.prototype.teardown=function(){if(this.active){this.vm._isBeingDestroyed||v(this.vm._watchers,this);for(var e=this.deps.length;e--;)this.deps[e].removeSub(this);this.active=!1}};var Xt={enumerable:!0,configurable:!0,get:C,set:C};function en(e,t,n){Xt.get=function(){return this[t][n]},Xt.set=function(e){this[t][n]=e},Object.defineProperty(e,n,Xt)}function tn(e){e._watchers=[];var t=e.$options;t.props&&function(e,t){var n=e.$options.propsData||{},r=e._props={},i=e.$options._propKeys=[];e.$parent&&de(!1);var o=function(o){i.push(o);var a=Te(o,t,n,e);me(r,o,a),o in e||en(e,"_props",o)};for(var a in t)o(a);de(!0)}(e,t.props),t.methods&&function(e,t){e.$options.props;for(var n in t)e[n]="function"!=typeof t[n]?C:x(t[n],e)}(e,t.methods),t.data?function(e){var t=e.$options.data;a(t=e._data="function"==typeof t?function(e,t){ne();try{return e.call(t,t)}catch(e){return Fe(e,t,"data()"),{}}finally{re()}}(t,e):t||{})||(t={});var n=Object.keys(t),r=e.$options.props,i=(e.$options.methods,n.length);for(;i--;){var o=n[i];r&&m(r,o)||(s=void 0,36!==(s=(o+"").charCodeAt(0))&&95!==s&&en(e,"_data",o))}var s;he(t,!0)}(e):he(e._data={},!0),t.computed&&function(e,t){var n=e._computedWatchers=Object.create(null),r=K();for(var i in t){var o=t[i],a="function"==typeof o?o:o.get;r||(n[i]=new Qt(e,a||C,C,nn)),i in e||rn(e,i,o)}}(e,t.computed),t.watch&&t.watch!==B&&function(e,t){for(var n in t){var r=t[n];if(Array.isArray(r))for(var i=0;i<r.length;i++)sn(e,n,r[i]);else sn(e,n,r)}}(e,t.watch)}var nn={lazy:!0};function rn(e,t,n){var r=!K();"function"==typeof n?(Xt.get=r?on(t):an(n),Xt.set=C):(Xt.get=n.get?r&&!1!==n.cache?on(t):an(n.get):C,Xt.set=n.set||C),Object.defineProperty(e,t,Xt)}function on(e){return function(){var t=this._computedWatchers&&this._computedWatchers[e];if(t)return t.dirty&&t.evaluate(),ee.target&&t.depend(),t.value}}function an(e){return function(){return e.call(this,this)}}function sn(e,t,n,r){return a(n)&&(r=n,n=n.handler),"string"==typeof n&&(n=e[n]),e.$watch(t,n,r)}var cn=0;function un(e){var t=e.options;if(e.super){var n=un(e.super);if(n!==e.superOptions){e.superOptions=n;var r=function(e){var t,n=e.options,r=e.sealedOptions;for(var i in n)n[i]!==r[i]&&(t||(t={}),t[i]=n[i]);return t}(e);r&&k(e.extendOptions,r),(t=e.options=Ce(n,e.extendOptions)).name&&(t.components[t.name]=e)}}return t}function ln(e){this._init(e)}function fn(e){e.cid=0;var t=1;e.extend=function(e){e=e||{};var n=this.cid,r=e._Ctor||(e._Ctor={});if(r[n])return r[n];var i=e.name||this.options.name,o=function(e){this._init(e)};(o.prototype=Object.create(this.prototype)).constructor=o,o.cid=t++,o.options=Ce(this.options,e),o.super=this,o.options.props&&function(e){var t=e.options.props;for(var n in t)en(e.prototype,"_props",n)}(o),o.options.computed&&function(e){var t=e.options.computed;for(var n in t)rn(e.prototype,n,t[n])}(o),o.extend=this.extend;for(var a=0;a<G.length;a++)o[G[a]]=this[G[a]];return i&&(o.options.components[i]=o),o.superOptions=this.options,o.extendOptions=e,o.sealedOptions=k({},o.options),r[n]=o,o}}!function(t){t.prototype._init=function(t){var n=this;n._uid=cn++,n._isVue=!0,t&&t._isComponent?function(e,t){var n=e.$options=Object.create(e.constructor.options),r=t._parentVnode;n.parent=t.parent,n._parentVnode=r;var i=r.componentOptions;n.propsData=i.propsData,n._parentListeners=i.listeners,n._renderChildren=i.children,n._componentTag=i.tag,t.render&&(n.render=t.render,n.staticRenderFns=t.staticRenderFns)}(n,t):n.$options=Ce(un(n.constructor),t||{},n),n._renderProxy=n,n._self=n,function(e){var t=e.$options,n=t.parent;if(n&&!t.abstract){for(;n.$options.abstract&&n.$parent;)n=n.$parent;n.$children.push(e)}e.$parent=n,e.$root=n?n.$root:e,e.$children=[],e.$refs={},e._watcher=null,e._inactive=null,e._directInactive=!1,e._isMounted=!1,e._isDestroyed=!1,e._isBeingDestroyed=!1}(n),function(e){e._events=Object.create(null),e._hasHookEvent=!1;var t=e.$options._parentListeners;t&&Et(e,t)}(n),function(t){t._vnode=null,t._staticTrees=null;var n=t.$options,r=t.$vnode=n._parentVnode,i=r&&r.context;t.$slots=nt(n._renderChildren,i),t.$scopedSlots=e,t._c=function(e,n,r,i){return jt(t,e,n,r,i,!1)},t.$createElement=function(e,n,r,i){return jt(t,e,n,r,i,!0)};var o=r&&r.data;me(t,"$attrs",o&&o.attrs||e,null,!0),me(t,"$listeners",n._parentListeners||e,null,!0)}(n),Ht(n,"beforeCreate"),function(e){var t=tt(e.$options.inject,e);if(t){de(!1);for(var n=Object.keys(t),r=0;r<n.length;r++){var i=n[r];me(e,i,t[i])}de(!0)}}(n),tn(n),function(e){var t=e.$options.provide;t&&(e._provided="function"==typeof t?t.call(e):t)}(n),Ht(n,"created"),n.$options.el&&n.$mount(n.$options.el)}}(ln),function(e){var t={get:function(){return this._data}},n={get:function(){return this._props}};Object.defineProperty(e.prototype,"$data",t),Object.defineProperty(e.prototype,"$props",n),e.prototype.$set=ye,e.prototype.$delete=ge,e.prototype.$watch=function(e,t,n){if(a(t))return sn(this,e,t,n);(n=n||{}).user=!0;var r=new Qt(this,e,t,n);if(n.immediate)try{t.call(this,r.value)}catch(e){Fe(e,this,'callback for immediate watcher "'+r.expression+'"')}return function(){r.teardown()}}}(ln),function(e){var t=/^hook:/;e.prototype.$on=function(e,n){var r=this;if(Array.isArray(e))for(var i=0,o=e.length;i<o;i++)r.$on(e[i],n);else(r._events[e]||(r._events[e]=[])).push(n),t.test(e)&&(r._hasHookEvent=!0);return r},e.prototype.$once=function(e,t){var n=this;function r(){n.$off(e,r),t.apply(n,arguments)}return r.fn=t,n.$on(e,r),n},e.prototype.$off=function(e,t){var n=this;if(!arguments.length)return n._events=Object.create(null),n;if(Array.isArray(e)){for(var r=0,i=e.length;r<i;r++)n.$off(e[r],t);return n}var o,a=n._events[e];if(!a)return n;if(!t)return n._events[e]=null,n;for(var s=a.length;s--;)if((o=a[s])===t||o.fn===t){a.splice(s,1);break}return n},e.prototype.$emit=function(e){var t=this._events[e];if(t){t=t.length>1?A(t):t;for(var n=A(arguments,1),r='event handler for "'+e+'"',i=0,o=t.length;i<o;i++)Ie(t[i],this,n,this,r)}return this}}(ln),function(e){e.prototype._update=function(e,t){var n=this,r=n.$el,i=n._vnode,o=function(e){var t=Lt;return Lt=e,function(){Lt=t}}(n);n._vnode=e,n.$el=i?n.__patch__(i,e):n.__patch__(n.$el,e,t,!1),o(),r&&(r.__vue__=null),n.$el&&(n.$el.__vue__=n),n.$vnode&&n.$parent&&n.$vnode===n.$parent._vnode&&(n.$parent.$el=n.$el)},e.prototype.$forceUpdate=function(){this._watcher&&this._watcher.update()},e.prototype.$destroy=function(){var e=this;if(!e._isBeingDestroyed){Ht(e,"beforeDestroy"),e._isBeingDestroyed=!0;var t=e.$parent;!t||t._isBeingDestroyed||e.$options.abstract||v(t.$children,e),e._watcher&&e._watcher.teardown();for(var n=e._watchers.length;n--;)e._watchers[n].teardown();e._data.__ob__&&e._data.__ob__.vmCount--,e._isDestroyed=!0,e.__patch__(e._vnode,null),Ht(e,"destroyed"),e.$off(),e.$el&&(e.$el.__vue__=null),e.$vnode&&(e.$vnode.parent=null)}}}(ln),function(e){bt(e.prototype),e.prototype.$nextTick=function(e){return Ke(e,this)},e.prototype._render=function(){var e,t=this,n=t.$options,r=n.render,i=n._parentVnode;i&&(t.$scopedSlots=it(i.data.scopedSlots,t.$slots,t.$scopedSlots)),t.$vnode=i;try{Dt=t,e=r.call(t._renderProxy,t.$createElement)}catch(n){Fe(n,t,"render"),e=t._vnode}finally{Dt=null}return Array.isArray(e)&&1===e.length&&(e=e[0]),e instanceof ie||(e=ae()),e.parent=i,e}}(ln),function(e){var t={get:function(){return Q}};Object.defineProperty(e,"config",t),e.options=Object.create(null);for(var n=0;n<G.length;n++)e.options[G[n]+"s"]=Object.create(null);e.options._base=e,fn(e),function(e){G.forEach(function(t){e[t]=function(e,n){return n?("component"===t&&a(n)&&(n.name=n.name||e,n=this.options._base.extend(n)),"directive"===t&&"function"==typeof n&&(n={bind:n,update:n}),this.options[t+"s"][e]=n,n):this.options[t+"s"][e]}})}(e)}(ln),Object.defineProperty(ln.prototype,"$isServer",{get:K}),Object.defineProperty(ln.prototype,"$ssrContext",{get:function(){return this.$vnode&&this.$vnode.ssrContext}}),Object.defineProperty(ln,"FunctionalRenderContext",{value:$t});var pn=f("style,class"),dn=f("input,textarea,option,select,progress"),vn=function(e,t,n){return"value"===n&&dn(e)&&"button"!==t||"selected"===n&&"option"===e||"checked"===n&&"input"===e||"muted"===n&&"video"===e},hn=f("contenteditable,draggable,spellcheck"),mn=f("events,caret,typing,plaintext-only"),yn=function(e,t){return wn(t)||"false"===t?"false":"contenteditable"===e&&mn(t)?t:"true"},gn=f("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,translate,truespeed,typemustmatch,visible"),_n="http://www.w3.org/1999/xlink",bn=function(e){return":"===e.charAt(5)&&"xlink"===e.slice(0,5)},$n=function(e){return bn(e)?e.slice(6,e.length):""},wn=function(e){return null==e||!1===e};function xn(e){for(var t=e.data,r=e,i=e;n(i.componentInstance);)(i=i.componentInstance._vnode)&&i.data&&(t=An(i.data,t));for(;n(r=r.parent);)r&&r.data&&(t=An(t,r.data));return function(e,t){if(n(e)||n(t))return kn(e,On(t));return""}(t.staticClass,t.class)}function An(e,t){return{staticClass:kn(e.staticClass,t.staticClass),class:n(e.class)?[e.class,t.class]:t.class}}function kn(e,t){return e?t?e+" "+t:e:t||""}function On(e){return Array.isArray(e)?function(e){for(var t,r="",i=0,o=e.length;i<o;i++)n(t=On(e[i]))&&""!==t&&(r&&(r+=" "),r+=t);return r}(e):i(e)?function(e){var t="";for(var n in e)e[n]&&(t&&(t+=" "),t+=n);return t}(e):"string"==typeof e?e:""}var Cn={svg:"http://www.w3.org/2000/svg",math:"http://www.w3.org/1998/Math/MathML"},Sn=f("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot"),Tn=f("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view",!0),jn=function(e){return Sn(e)||Tn(e)};function Nn(e){return Tn(e)?"svg":"math"===e?"math":void 0}var Dn=Object.create(null);var Fn=f("text,number,password,search,email,tel,url");function In(e){if("string"==typeof e){var t=document.querySelector(e);return t||document.createElement("div")}return e}var Mn=Object.freeze({__proto__:null,createElement:function(e,t){var n=document.createElement(e);return"select"!==e?n:(t.data&&t.data.attrs&&void 0!==t.data.attrs.multiple&&n.setAttribute("multiple","multiple"),n)},createElementNS:function(e,t){return document.createElementNS(Cn[e],t)},createTextNode:function(e){return document.createTextNode(e)},createComment:function(e){return document.createComment(e)},insertBefore:function(e,t,n){e.insertBefore(t,n)},removeChild:function(e,t){e.removeChild(t)},appendChild:function(e,t){e.appendChild(t)},parentNode:function(e){return e.parentNode},nextSibling:function(e){return e.nextSibling},tagName:function(e){return e.tagName},setTextContent:function(e,t){e.textContent=t},setStyleScope:function(e,t){e.setAttribute(t,"")}}),Pn={create:function(e,t){En(t)},update:function(e,t){e.data.ref!==t.data.ref&&(En(e,!0),En(t))},destroy:function(e){En(e,!0)}};function En(e,t){var r=e.data.ref;if(n(r)){var i=e.context,o=e.componentInstance||e.elm,a=i.$refs;t?Array.isArray(a[r])?v(a[r],o):a[r]===o&&(a[r]=void 0):e.data.refInFor?Array.isArray(a[r])?a[r].indexOf(o)<0&&a[r].push(o):a[r]=[o]:a[r]=o}}var Ln=new ie("",{},[]),Rn=["create","activate","update","remove","destroy"];function Hn(e,r){return e&&r&&e.key===r.key&&(e.tag===r.tag&&e.isComment===r.isComment&&n(e.data)===n(r.data)&&function(e,t){if("input"!==e.tag)return!0;var r,i=n(r=e.data)&&n(r=r.attrs)&&r.type,o=n(r=t.data)&&n(r=r.attrs)&&r.type;return i===o||Fn(i)&&Fn(o)}(e,r)||!0===e.isAsyncPlaceholder&&e.asyncFactory===r.asyncFactory&&t(r.asyncFactory.error))}function Un(e,t,r){var i,o,a={};for(i=t;i<=r;++i)n(o=e[i].key)&&(a[o]=i);return a}var Bn={create:zn,update:zn,destroy:function(e){zn(e,Ln)}};function zn(e,t){(e.data.directives||t.data.directives)&&function(e,t){var n,r,i,o=e===Ln,a=t===Ln,s=Kn(e.data.directives,e.context),c=Kn(t.data.directives,t.context),u=[],l=[];for(n in c)r=s[n],i=c[n],r?(i.oldValue=r.value,i.oldArg=r.arg,qn(i,"update",t,e),i.def&&i.def.componentUpdated&&l.push(i)):(qn(i,"bind",t,e),i.def&&i.def.inserted&&u.push(i));if(u.length){var f=function(){for(var n=0;n<u.length;n++)qn(u[n],"inserted",t,e)};o?Ye(t,"insert",f):f()}l.length&&Ye(t,"postpatch",function(){for(var n=0;n<l.length;n++)qn(l[n],"componentUpdated",t,e)});if(!o)for(n in s)c[n]||qn(s[n],"unbind",e,e,a)}(e,t)}var Vn=Object.create(null);function Kn(e,t){var n,r,i=Object.create(null);if(!e)return i;for(n=0;n<e.length;n++)(r=e[n]).modifiers||(r.modifiers=Vn),i[Jn(r)]=r,r.def=Se(t.$options,"directives",r.name);return i}function Jn(e){return e.rawName||e.name+"."+Object.keys(e.modifiers||{}).join(".")}function qn(e,t,n,r,i){var o=e.def&&e.def[t];if(o)try{o(n.elm,e,n,r,i)}catch(r){Fe(r,n.context,"directive "+e.name+" "+t+" hook")}}var Zn=[Pn,Bn];function Wn(e,r){var i=r.componentOptions;if(!(n(i)&&!1===i.Ctor.options.inheritAttrs||t(e.data.attrs)&&t(r.data.attrs))){var o,a,s=r.elm,c=e.data.attrs||{},u=r.data.attrs||{};for(o in n(u.__ob__)&&(u=r.data.attrs=k({},u)),u)a=u[o],c[o]!==a&&Gn(s,o,a);for(o in c)t(u[o])&&(bn(o)?s.removeAttributeNS(_n,$n(o)):hn(o)||s.removeAttribute(o))}}function Gn(e,t,n){e.tagName.indexOf("-")>-1?Yn(e,t,n):gn(t)?wn(n)?e.removeAttribute(t):(n="allowfullscreen"===t&&"EMBED"===e.tagName?"true":t,e.setAttribute(t,n)):hn(t)?e.setAttribute(t,yn(t,n)):bn(t)?wn(n)?e.removeAttributeNS(_n,$n(t)):e.setAttributeNS(_n,t,n):Yn(e,t,n)}function Yn(e,t,n){wn(n)?e.removeAttribute(t):e.setAttribute(t,n)}var Qn={create:Wn,update:Wn};function Xn(e,n){var r=n.elm,i=n.data,o=e.data;if(!(t(i.staticClass)&&t(i.class)&&(t(o)||t(o.staticClass)&&t(o.class)))){var a=xn(n);a!==r._prevClass&&(r.setAttribute("class",a),r._prevClass=a)}}var er,tr,nr,rr,ir,or,ar={create:Xn,update:Xn};function sr(e,t){console.error("[Vue compiler]: "+e)}function cr(e,t){return e?e.map(function(e){return e[t]}).filter(function(e){return e}):[]}function ur(e,t,n,r,i){(e.props||(e.props=[])).push(yr({name:t,value:n,dynamic:i},r)),e.plain=!1}function lr(e,t,n,r,i){(i?e.dynamicAttrs||(e.dynamicAttrs=[]):e.attrs||(e.attrs=[])).push(yr({name:t,value:n,dynamic:i},r)),e.plain=!1}function fr(e,t,n,r){e.attrsMap[t]=n,e.attrsList.push(yr({name:t,value:n},r))}function pr(e,t,n,r,i,o,a,s){(e.directives||(e.directives=[])).push(yr({name:t,rawName:n,value:r,arg:i,isDynamicArg:o,modifiers:a},s)),e.plain=!1}function dr(e,t,n){return n?"_p("+t+',"'+e+'")':e+t}function vr(t,n,r,i,o,a,s,c){var u;(i=i||e).right?c?n="("+n+")==='click'?'contextmenu':("+n+")":"click"===n&&(n="contextmenu",delete i.right):i.middle&&(c?n="("+n+")==='click'?'mouseup':("+n+")":"click"===n&&(n="mouseup")),i.capture&&(delete i.capture,n=dr("!",n,c)),i.once&&(delete i.once,n=dr("~",n,c)),i.passive&&(delete i.passive,n=dr("&",n,c)),i.native?(delete i.native,u=t.nativeEvents||(t.nativeEvents={})):u=t.events||(t.events={});var l=yr({value:r.trim(),dynamic:c},s);i!==e&&(l.modifiers=i);var f=u[n];Array.isArray(f)?o?f.unshift(l):f.push(l):u[n]=f?o?[l,f]:[f,l]:l,t.plain=!1}function hr(e,t,n){var r=mr(e,":"+t)||mr(e,"v-bind:"+t);if(null!=r)return r;if(!1!==n){var i=mr(e,t);if(null!=i)return JSON.stringify(i)}}function mr(e,t,n){var r;if(null!=(r=e.attrsMap[t]))for(var i=e.attrsList,o=0,a=i.length;o<a;o++)if(i[o].name===t){i.splice(o,1);break}return n&&delete e.attrsMap[t],r}function yr(e,t){return t&&(null!=t.start&&(e.start=t.start),null!=t.end&&(e.end=t.end)),e}function gr(e,t,n){var r=n||{},i=r.number,o="$$v";r.trim&&(o="(typeof $$v === 'string'? $$v.trim(): $$v)"),i&&(o="_n("+o+")");var a=_r(t,o);e.model={value:"("+t+")",expression:JSON.stringify(t),callback:"function ($$v) {"+a+"}"}}function _r(e,t){var n=function(e){if(e=e.trim(),er=e.length,e.indexOf("[")<0||e.lastIndexOf("]")<er-1)return(rr=e.lastIndexOf("."))>-1?{exp:e.slice(0,rr),key:'"'+e.slice(rr+1)+'"'}:{exp:e,key:null};tr=e,rr=ir=or=0;for(;!$r();)wr(nr=br())?Ar(nr):91===nr&&xr(nr);return{exp:e.slice(0,ir),key:e.slice(ir+1,or)}}(e);return null===n.key?e+"="+t:"$set("+n.exp+", "+n.key+", "+t+")"}function br(){return tr.charCodeAt(++rr)}function $r(){return rr>=er}function wr(e){return 34===e||39===e}function xr(e){var t=1;for(ir=rr;!$r();)if(wr(e=br()))Ar(e);else if(91===e&&t++,93===e&&t--,0===t){or=rr;break}}function Ar(e){for(var t=e;!$r()&&(e=br())!==t;);}var kr,Or="__r",Cr="__c";function Sr(e,t,n){var r=kr;return function i(){null!==t.apply(null,arguments)&&Nr(e,i,n,r)}}var Tr=Ee&&!(U&&Number(U[1])<=53);function jr(e,t,n,r){if(Tr){var i=qt,o=t;t=o._wrapper=function(e){if(e.target===e.currentTarget||e.timeStamp>=i||e.timeStamp<=0||e.target.ownerDocument!==document)return o.apply(this,arguments)}}kr.addEventListener(e,t,z?{capture:n,passive:r}:n)}function Nr(e,t,n,r){(r||kr).removeEventListener(e,t._wrapper||t,n)}function Dr(e,r){if(!t(e.data.on)||!t(r.data.on)){var i=r.data.on||{},o=e.data.on||{};kr=r.elm,function(e){n(e[Or])&&(e.input=[].concat(e[Or],e.input||[]),delete e[Or]);n(e[Cr])&&(e.change=[].concat(e[Cr],e.change||[]),delete e[Cr])}(i),Ge(i,o,jr,Nr,Sr,r.context),kr=void 0}}var Fr={create:Dr,update:Dr};function Ir(e,r){if(!t(e.data.domProps)||!t(r.data.domProps)){var i,o,a=r.elm,s=e.data.domProps||{},c=r.data.domProps||{};for(i in n(c.__ob__)&&(c=r.data.domProps=k({},c)),s)i in c||(a[i]="");for(i in c){if(o=c[i],"textContent"===i||"innerHTML"===i){if(r.children&&(r.children.length=0),o===s[i])continue;1===a.childNodes.length&&a.removeChild(a.childNodes[0])}if(o!==s[i])try{a[i]=o}catch(e){}}}}var Mr={create:Ir,update:Ir},Pr=y(function(e){for(var t={},n=/:(.+)/,r=e.split(/;(?![^(]*\))/g),i=0;i<r.length;i++){var o=r[i];if(o){var a=o.split(n);a.length>1&&(t[a[0].trim()]=a[1].trim())}}return t});function Er(e){var t=Lr(e.style);return e.staticStyle?k(e.staticStyle,t):t}function Lr(e){return Array.isArray(e)?O(e):"string"==typeof e?Pr(e):e}var Rr,Hr=/^--/,Ur=/\s*!important$/,Br=function(e,t,n){if(Hr.test(t))e.style.setProperty(t,n);else if(Ur.test(n))e.style.setProperty(w(t),n.replace(Ur,""),"important");else{var r=Vr(t);if(Array.isArray(n))for(var i=0,o=n.length;i<o;i++)e.style[r]=n[i];else e.style[r]=n}},zr=["Webkit","Moz","ms"],Vr=y(function(e){if(Rr=Rr||document.createElement("div").style,"filter"!==(e=_(e))&&e in Rr)return e;for(var t=e.charAt(0).toUpperCase()+e.slice(1),n=0;n<zr.length;n++){var r=zr[n]+t;if(r in Rr)return r}});function Kr(e,r){var i=r.data,o=e.data;if(!(t(i.staticStyle)&&t(i.style)&&t(o.staticStyle)&&t(o.style))){var a,s,c=r.elm,u=o.staticStyle,l=o.normalizedStyle||o.style||{},f=u||l,p=Lr(r.data.style)||{};r.data.normalizedStyle=n(p.__ob__)?k({},p):p;var d=function(e,t){var n,r={};if(t)for(var i=e;i.componentInstance;)(i=i.componentInstance._vnode)&&i.data&&(n=Er(i.data))&&k(r,n);(n=Er(e.data))&&k(r,n);for(var o=e;o=o.parent;)o.data&&(n=Er(o.data))&&k(r,n);return r}(r,!0);for(s in f)t(d[s])&&Br(c,s,"");for(s in d)(a=d[s])!==f[s]&&Br(c,s,a)}}var Jr=function(e){var i,o,a={},s=e.modules,c=e.nodeOps;for(i=0;i<Rn.length;++i)for(a[Rn[i]]=[],o=0;o<s.length;++o)n(s[o][Rn[i]])&&a[Rn[i]].push(s[o][Rn[i]]);function u(e){var t=c.parentNode(e);n(t)&&c.removeChild(t,e)}function l(e,t,r,i,o,a,s){if(n(e.elm)&&n(a)&&(e=a[s]=ce(e)),e.isRootInsert=!o,!function(e,t,r,i){var o=e.data;if(n(o)&&(n(o=o.hook)&&n(o=o.init)&&o(e,!1),n(e.componentInstance)))return p(e,t),d(r,e.elm,i),!0}(e,t,r,i)){var u=e.data,l=e.children,f=e.tag;n(f)?(e.elm=e.ns?c.createElementNS(e.ns,f):c.createElement(f,e),y(e),v(e,l,t),n(u)&&m(e,t),d(r,e.elm,i)):!0===e.isComment?(e.elm=c.createComment(e.text),d(r,e.elm,i)):(e.elm=c.createTextNode(e.text),d(r,e.elm,i))}}function p(e,t){n(e.data.pendingInsert)&&(t.push.apply(t,e.data.pendingInsert),e.data.pendingInsert=null),e.elm=e.componentInstance.$el,h(e)?(m(e,t),y(e)):(En(e),t.push(e))}function d(e,t,r){n(e)&&(n(r)?c.parentNode(r)===e&&c.insertBefore(e,t,r):c.appendChild(e,t))}function v(e,t,n){if(Array.isArray(t))for(var i=0;i<t.length;++i)l(t[i],n,e.elm,null,!0,t,i);else r(e.text)&&c.appendChild(e.elm,c.createTextNode(String(e.text)))}function h(e){for(;e.componentInstance;)e=e.componentInstance._vnode;return n(e.tag)}function m(e,t){for(var r=0;r<a.create.length;++r)a.create[r](Ln,e);n(i=e.data.hook)&&(n(i.create)&&i.create(Ln,e),n(i.insert)&&t.push(e))}function y(e){var t;if(n(t=e.fnScopeId))c.setStyleScope(e.elm,t);else for(var r=e;r;)n(t=r.context)&&n(t=t.$options._scopeId)&&c.setStyleScope(e.elm,t),r=r.parent;n(t=Lt)&&t!==e.context&&t!==e.fnContext&&n(t=t.$options._scopeId)&&c.setStyleScope(e.elm,t)}function g(e,t,n,r,i,o){for(;r<=i;++r)l(n[r],o,e,t,!1,n,r)}function _(e){var t,r,i=e.data;if(n(i))for(n(t=i.hook)&&n(t=t.destroy)&&t(e),t=0;t<a.destroy.length;++t)a.destroy[t](e);if(n(t=e.children))for(r=0;r<e.children.length;++r)_(e.children[r])}function b(e,t,r,i){for(;r<=i;++r){var o=t[r];n(o)&&(n(o.tag)?($(o),_(o)):u(o.elm))}}function $(e,t){if(n(t)||n(e.data)){var r,i=a.remove.length+1;for(n(t)?t.listeners+=i:t=function(e,t){function n(){0==--n.listeners&&u(e)}return n.listeners=t,n}(e.elm,i),n(r=e.componentInstance)&&n(r=r._vnode)&&n(r.data)&&$(r,t),r=0;r<a.remove.length;++r)a.remove[r](e,t);n(r=e.data.hook)&&n(r=r.remove)?r(e,t):t()}else u(e.elm)}function w(e,t,r,i){for(var o=r;o<i;o++){var a=t[o];if(n(a)&&Hn(e,a))return o}}function x(e,r,i,o,s,u){if(e!==r){n(r.elm)&&n(o)&&(r=o[s]=ce(r));var f=r.elm=e.elm;if(!0!==e.isAsyncPlaceholder)if(!0!==r.isStatic||!0!==e.isStatic||r.key!==e.key||!0!==r.isCloned&&!0!==r.isOnce){var p,d=r.data;n(d)&&n(p=d.hook)&&n(p=p.prepatch)&&p(e,r);var v=e.children,m=r.children;if(n(d)&&h(r)){for(p=0;p<a.update.length;++p)a.update[p](e,r);n(p=d.hook)&&n(p=p.update)&&p(e,r)}t(r.text)?n(v)&&n(m)?v!==m&&function(e,r,i,o,a){for(var s,u,f,p=0,d=0,v=r.length-1,h=r[0],m=r[v],y=i.length-1,_=i[0],$=i[y],A=!a;p<=v&&d<=y;)t(h)?h=r[++p]:t(m)?m=r[--v]:Hn(h,_)?(x(h,_,o,i,d),h=r[++p],_=i[++d]):Hn(m,$)?(x(m,$,o,i,y),m=r[--v],$=i[--y]):Hn(h,$)?(x(h,$,o,i,y),A&&c.insertBefore(e,h.elm,c.nextSibling(m.elm)),h=r[++p],$=i[--y]):Hn(m,_)?(x(m,_,o,i,d),A&&c.insertBefore(e,m.elm,h.elm),m=r[--v],_=i[++d]):(t(s)&&(s=Un(r,p,v)),t(u=n(_.key)?s[_.key]:w(_,r,p,v))?l(_,o,e,h.elm,!1,i,d):Hn(f=r[u],_)?(x(f,_,o,i,d),r[u]=void 0,A&&c.insertBefore(e,f.elm,h.elm)):l(_,o,e,h.elm,!1,i,d),_=i[++d]);p>v?g(e,t(i[y+1])?null:i[y+1].elm,i,d,y,o):d>y&&b(0,r,p,v)}(f,v,m,i,u):n(m)?(n(e.text)&&c.setTextContent(f,""),g(f,null,m,0,m.length-1,i)):n(v)?b(0,v,0,v.length-1):n(e.text)&&c.setTextContent(f,""):e.text!==r.text&&c.setTextContent(f,r.text),n(d)&&n(p=d.hook)&&n(p=p.postpatch)&&p(e,r)}else r.componentInstance=e.componentInstance;else n(r.asyncFactory.resolved)?O(e.elm,r,i):r.isAsyncPlaceholder=!0}}function A(e,t,r){if(!0===r&&n(e.parent))e.parent.data.pendingInsert=t;else for(var i=0;i<t.length;++i)t[i].data.hook.insert(t[i])}var k=f("attrs,class,staticClass,staticStyle,key");function O(e,t,r,i){var o,a=t.tag,s=t.data,c=t.children;if(i=i||s&&s.pre,t.elm=e,!0===t.isComment&&n(t.asyncFactory))return t.isAsyncPlaceholder=!0,!0;if(n(s)&&(n(o=s.hook)&&n(o=o.init)&&o(t,!0),n(o=t.componentInstance)))return p(t,r),!0;if(n(a)){if(n(c))if(e.hasChildNodes())if(n(o=s)&&n(o=o.domProps)&&n(o=o.innerHTML)){if(o!==e.innerHTML)return!1}else{for(var u=!0,l=e.firstChild,f=0;f<c.length;f++){if(!l||!O(l,c[f],r,i)){u=!1;break}l=l.nextSibling}if(!u||l)return!1}else v(t,c,r);if(n(s)){var d=!1;for(var h in s)if(!k(h)){d=!0,m(t,r);break}!d&&s.class&&qe(s.class)}}else e.data!==t.text&&(e.data=t.text);return!0}return function(e,r,i,o){if(!t(r)){var s,u=!1,f=[];if(t(e))u=!0,l(r,f);else{var p=void 0!==e.nodeType;if(!p&&Hn(e,r))x(e,r,f,null,null,o);else{if(p){if(1===e.nodeType&&e.hasAttribute(W)&&(e.removeAttribute(W),i=!0),!0===i&&O(e,r,f))return A(r,f,!0),e;s=e,e=new ie(c.tagName(s).toLowerCase(),{},[],void 0,s)}var d=e.elm,v=c.parentNode(d);if(l(r,f,d._leaveCb?null:v,c.nextSibling(d)),n(r.parent))for(var m=r.parent,y=h(r);m;){for(var g=0;g<a.destroy.length;++g)a.destroy[g](m);if(m.elm=r.elm,y){for(var $=0;$<a.create.length;++$)a.create[$](Ln,m);var w=m.data.hook.insert;if(w.merged)for(var k=1;k<w.fns.length;k++)w.fns[k]()}else En(m);m=m.parent}n(v)?b(0,[e],0,0):n(e.tag)&&_(e)}}return A(r,f,u),r.elm}n(e)&&_(e)}}({nodeOps:Mn,modules:[Qn,ar,Fr,Mr,{create:Kr,update:Kr}].concat(Zn)}),qr={inserted:function(e,t,n,r){"select"===n.tag?(r.elm&&!r.elm._vOptions?Ye(n,"postpatch",function(){qr.componentUpdated(e,t,n)}):Zr(e,t,n.context),e._vOptions=[].map.call(e.options,Gr)):("textarea"===n.tag||Fn(e.type))&&(e._vModifiers=t.modifiers,t.modifiers.lazy||(e.addEventListener("compositionstart",Yr),e.addEventListener("compositionend",Qr),e.addEventListener("change",Qr)))},componentUpdated:function(e,t,n){if("select"===n.tag){Zr(e,t,n.context);var r=e._vOptions,i=e._vOptions=[].map.call(e.options,Gr);if(i.some(function(e,t){return!T(e,r[t])}))(e.multiple?t.value.some(function(e){return Wr(e,i)}):t.value!==t.oldValue&&Wr(t.value,i))&&Xr(e,"change")}}};function Zr(e,t,n){!function(e,t,n){var r,i,o=t.value,a=e.multiple;if(a&&!Array.isArray(o))return;for(var s=0,c=e.options.length;s<c;s++)if(i=e.options[s],a)r=j(o,Gr(i))>-1,i.selected!==r&&(i.selected=r);else if(T(Gr(i),o))return void(e.selectedIndex!==s&&(e.selectedIndex=s));a||(e.selectedIndex=-1)}(e,t)}function Wr(e,t){return t.every(function(t){return!T(t,e)})}function Gr(e){return"_value"in e?e._value:e.value}function Yr(e){e.target.composing=!0}function Qr(e){e.target.composing&&(e.target.composing=!1,Xr(e.target,"input"))}function Xr(e,t){var n=document.createEvent("HTMLEvents");n.initEvent(t,!0,!0),e.dispatchEvent(n)}var ei={model:qr};ln.config.mustUseProp=vn,ln.config.isReservedTag=jn,ln.config.isReservedAttr=pn,ln.config.getTagNamespace=Nn,ln.config.isUnknownElement=function(e){if(!E)return!0;if(jn(e))return!1;if(e=e.toLowerCase(),null!=Dn[e])return Dn[e];var t=document.createElement(e);return e.indexOf("-")>-1?Dn[e]=t.constructor===window.HTMLUnknownElement||t.constructor===window.HTMLElement:Dn[e]=/HTMLUnknownElement/.test(t.toString())},k(ln.options.directives,ei),ln.prototype.__patch__=E?Jr:C,ln.prototype.$mount=function(e,t){return function(e,t,n){var r;return e.$el=t,e.$options.render||(e.$options.render=ae),Ht(e,"beforeMount"),r=function(){e._update(e._render(),n)},new Qt(e,r,C,{before:function(){e._isMounted&&!e._isDestroyed&&Ht(e,"beforeUpdate")}},!0),n=!1,null==e.$vnode&&(e._isMounted=!0,Ht(e,"mounted")),e}(this,e=e&&E?In(e):void 0,t)};var ti=/\{\{((?:.|\r?\n)+?)\}\}|\{\@((?:.|\r?\n)+?)\@\}/g,ni=/[-.*+?^${}()|[\]\/\\]/g,ri=y(function(e){var t=e[0].replace(ni,"\\$&"),n=e[1].replace(ni,"\\$&");return new RegExp(t+"((?:.|\\n)+?)"+n,"g")});var ii={staticKeys:["staticClass"],transformNode:function(e,t){t.warn;var n=mr(e,"class");n&&(e.staticClass=JSON.stringify(n));var r=hr(e,"class",!1);r&&(e.classBinding=r)},genData:function(e){var t="";return e.staticClass&&(t+="staticClass:"+e.staticClass+","),e.classBinding&&(t+="class:"+e.classBinding+","),t}};var oi,ai={staticKeys:["staticStyle"],transformNode:function(e,t){t.warn;var n=mr(e,"style");n&&(e.staticStyle=JSON.stringify(Pr(n)));var r=hr(e,"style",!1);r&&(e.styleBinding=r)},genData:function(e){var t="";return e.staticStyle&&(t+="staticStyle:"+e.staticStyle+","),e.styleBinding&&(t+="style:("+e.styleBinding+"),"),t}},si=function(e){return(oi=oi||document.createElement("div")).innerHTML=e,oi.textContent},ci=f("area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr"),ui=f("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source"),li=f("address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track"),fi=/^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/,pi=/^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/,di="[a-zA-Z_][\\-\\.0-9_a-zA-Z"+D.source+"]*",vi="((?:"+di+"\\:)?"+di+")",hi=new RegExp("^<"+vi),mi=/^\s*(\/?)>/,yi=new RegExp("^<\\/"+vi+"[^>]*>"),gi=/^<!DOCTYPE [^>]+>/i,_i=/^<!\--/,bi=/^<!\[/,$i=f("script,style,textarea",!0),wi={},xi={"&lt;":"<","&gt;":">","&quot;":'"',"&amp;":"&","&#10;":"\n","&#9;":"\t","&#39;":"'"},Ai=/&(?:lt|gt|quot|amp|#39);/g,ki=/&(?:lt|gt|quot|amp|#39|#10|#9);/g,Oi=f("pre,textarea",!0),Ci=function(e,t){return e&&Oi(e)&&"\n"===t[0]};function Si(e,t){var n=t?ki:Ai;return e.replace(n,function(e){return xi[e]})}var Ti,ji,Ni,Di,Fi,Ii,Mi,Pi,Ei=/^@|^v-on:/,Li=/^v-|^@|^:/,Ri=/([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,Hi=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,Ui=/^\(|\)$/g,Bi=/^\[.*\]$/,zi=/:(.*)$/,Vi=/^:|^\.|^v-bind:/,Ki=/\.[^.\]]+(?=[^\]]*$)/g,Ji=/[\r\n]/,qi=/\s+/g,Zi=y(si),Wi="_empty_";function Gi(e,t,n){return{type:1,tag:e,attrsList:t,attrsMap:no(t),rawAttrsMap:{},parent:n,children:[]}}function Yi(e,t){Ti=t.warn||sr,Ii=t.isPreTag||S,Mi=t.mustUseProp||S,Pi=t.getTagNamespace||S;t.isReservedTag;Ni=cr(t.modules,"transformNode"),Di=cr(t.modules,"preTransformNode"),Fi=cr(t.modules,"postTransformNode"),ji=t.delimiters;var n,r,i=[],o=!1!==t.preserveWhitespace,a=t.whitespace,s=!1,c=!1;function u(e){if(l(e),s||e.processed||(e=Qi(e,t)),i.length||e===n||n.if&&(e.elseif||e.else)&&eo(n,{exp:e.elseif,block:e}),r&&!e.forbidden)if(e.elseif||e.else)a=e,(u=function(e){var t=e.length;for(;t--;){if(1===e[t].type)return e[t];e.pop()}}(r.children))&&u.if&&eo(u,{exp:a.elseif,block:a});else{if(e.slotScope){var o=e.slotTarget||'"default"';(r.scopedSlots||(r.scopedSlots={}))[o]=e}r.children.push(e),e.parent=r}var a,u;e.children=e.children.filter(function(e){return!e.slotScope}),l(e),e.pre&&(s=!1),Ii(e.tag)&&(c=!1);for(var f=0;f<Fi.length;f++)Fi[f](e,t)}function l(e){if(!c)for(var t;(t=e.children[e.children.length-1])&&3===t.type&&" "===t.text;)e.children.pop()}return function(e,t){for(var n,r,i=[],o=t.expectHTML,a=t.isUnaryTag||S,s=t.canBeLeftOpenTag||S,c=0;e;){if(n=e,r&&$i(r)){var u=0,l=r,f=wi[l]||(wi[l]=new RegExp("([\\s\\S]*?)(</"+l+"[^>]*>)","i")),p=e.replace(f,function(e,n,r){return u=r.length,$i(l)||(n=n.replace(/<!\--([\s\S]*?)-->/g,"$1").replace(/<!\[CDATA\[([\s\S]*?)]]>/g,"$1")),Ci(l,n)&&(n=n.slice(1)),t.chars&&t.chars(n),""});c+=e.length-p.length,e=p,O(l,c-u,c)}else{var d=e.indexOf("<");if(0===d){if(_i.test(e)){var v=e.indexOf("--\x3e");if(v>=0){t.shouldKeepComment&&t.comment(e.substring(4,v),c,c+v+3),x(v+3);continue}}if(bi.test(e)){var h=e.indexOf("]>");if(h>=0){x(h+2);continue}}var m=e.match(gi);if(m){x(m[0].length);continue}var y=e.match(yi);if(y){var g=c;x(y[0].length),O(y[1],g,c);continue}var _=A();if(_){k(_),Ci(_.tagName,e)&&x(1);continue}}var b=void 0,$=void 0,w=void 0;if(d>=0){for($=e.slice(d);!(yi.test($)||hi.test($)||_i.test($)||bi.test($)||(w=$.indexOf("<",1))<0);)d+=w,$=e.slice(d);b=e.substring(0,d)}d<0&&(b=e),b&&x(b.length),t.chars&&b&&t.chars(b,c-b.length,c)}if(e===n){t.chars&&t.chars(e);break}}function x(t){c+=t,e=e.substring(t)}function A(){var t=e.match(hi);if(t){var n,r,i={tagName:t[1],attrs:[],start:c};for(x(t[0].length);!(n=e.match(mi))&&(r=e.match(pi)||e.match(fi));)r.start=c,x(r[0].length),r.end=c,i.attrs.push(r);if(n)return i.unarySlash=n[1],x(n[0].length),i.end=c,i}}function k(e){var n=e.tagName,c=e.unarySlash;o&&("p"===r&&li(n)&&O(r),s(n)&&r===n&&O(n));for(var u=a(n)||!!c,l=e.attrs.length,f=new Array(l),p=0;p<l;p++){var d=e.attrs[p],v=d[3]||d[4]||d[5]||"",h="a"===n&&"href"===d[1]?t.shouldDecodeNewlinesForHref:t.shouldDecodeNewlines;f[p]={name:d[1],value:Si(v,h)}}u||(i.push({tag:n,lowerCasedTag:n,attrs:f,start:e.start,end:e.end}),r=n),t.start&&t.start(n,f,u,e.start,e.end)}function O(e,n,o){var a,s;if(null==n&&(n=c),null==o&&(o=c),e)for(s=e,a=i.length-1;a>=0&&i[a].lowerCasedTag!==s;a--);else a=0;if(a>=0){for(var u=i.length-1;u>=a;u--)t.end&&t.end(i[u].tag,n,o);i.length=a,r=a&&i[a-1].tag}else"br"===s?t.start&&t.start(e,[],!0,n,o):"p"===s&&(t.start&&t.start(e,[],!1,n,o),t.end&&t.end(e,n,o))}O()}(e,{warn:Ti,expectHTML:t.expectHTML,isUnaryTag:t.isUnaryTag,canBeLeftOpenTag:t.canBeLeftOpenTag,shouldDecodeNewlines:t.shouldDecodeNewlines,shouldDecodeNewlinesForHref:t.shouldDecodeNewlinesForHref,shouldKeepComment:t.comments,outputSourceRange:t.outputSourceRange,start:function(e,o,a,l,f){var p,d=r&&r.ns||Pi(e),v=Gi(e,o,r);d&&(v.ns=d),"style"!==(p=v).tag&&("script"!==p.tag||p.attrsMap.type&&"text/javascript"!==p.attrsMap.type)||K()||(v.forbidden=!0);for(var h=0;h<Di.length;h++)v=Di[h](v,t)||v;s||(!function(e){null!=mr(e,"v-pre")&&(e.pre=!0)}(v),v.pre&&(s=!0)),Ii(v.tag)&&(c=!0),s?function(e){var t=e.attrsList,n=t.length;if(n)for(var r=e.attrs=new Array(n),i=0;i<n;i++)r[i]={name:t[i].name,value:JSON.stringify(t[i].value)},null!=t[i].start&&(r[i].start=t[i].start,r[i].end=t[i].end);else e.pre||(e.plain=!0)}(v):v.processed||(Xi(v),function(e){var t=mr(e,"v-if");if(t)e.if=t,eo(e,{exp:t,block:e});else{null!=mr(e,"v-else")&&(e.else=!0);var n=mr(e,"v-else-if");n&&(e.elseif=n)}}(v),function(e){null!=mr(e,"v-once")&&(e.once=!0)}(v)),n||(n=v),a?u(v):(r=v,i.push(v))},end:function(e,t,n){var o=i[i.length-1];i.length-=1,r=i[i.length-1],u(o)},chars:function(e,t,n){if(r){var i,u,l,f=r.children;if(e=c||e.trim()?"script"===(i=r).tag||"style"===i.tag?e:Zi(e):f.length?a?"condense"===a&&Ji.test(e)?"":" ":o?" ":"":"")c||"condense"!==a||(e=e.replace(qi," ")),!s&&" "!==e&&(u=function(e,t){var n=t?ri(t):ti;if(n.test(e)){for(var r,i,o,a=[],s=[],c=n.lastIndex=0,u=!1;r=n.exec(e);){(i=r.index)>c&&(s.push(o=e.slice(c,i)),a.push(JSON.stringify(o)));var l=r[2];if(l)a.push({exp:l.trim()}),u=!0;else{var f=r[1].trim();a.push("_s("+f+")"),s.push({"@binding":f})}c=i+r[0].length}return c<e.length&&(s.push(o=e.slice(c)),a.push(JSON.stringify(o))),{expression:a,tokens:s,hasChildExp:u}}}(e,ji))?l={type:2,expression:u.expression,tokens:u.tokens,hasChildExp:u.hasChildExp,text:e}:" "===e&&f.length&&" "===f[f.length-1].text||(l={type:3,text:e}),l&&f.push(l)}},comment:function(e,t,n){if(r){var i={type:3,text:e,isComment:!0};r.children.push(i)}}}),n}function Qi(e,t){var n,r;(r=hr(n=e,"key"))&&(n.key=r),e.plain=!e.key&&!e.scopedSlots&&!e.attrsList.length,function(e){var t=hr(e,"ref");t&&(e.ref=t,e.refInFor=function(e){var t=e;for(;t;){if(void 0!==t.for)return!0;t=t.parent}return!1}(e))}(e),function(e){var t;"template"===e.tag?(t=mr(e,"scope"),e.slotScope=t||mr(e,"slot-scope")):(t=mr(e,"slot-scope"))&&(e.slotScope=t);var n=hr(e,"slot");n&&(e.slotTarget='""'===n?'"default"':n,e.slotTargetDynamic=!(!e.attrsMap[":slot"]&&!e.attrsMap["v-bind:slot"]),"template"===e.tag||e.slotScope||lr(e,"slot",n,function(e,t){return e.rawAttrsMap[":"+t]||e.rawAttrsMap["v-bind:"+t]||e.rawAttrsMap[t]}(e,"slot")))}(e),function(e){"slot"===e.tag&&(e.slotName=hr(e,"name"))}(e),function(e){var t;(t=hr(e,"is"))&&(e.component=t);null!=mr(e,"inline-template")&&(e.inlineTemplate=!0)}(e);for(var i=0;i<Ni.length;i++)e=Ni[i](e,t)||e;return function(e){var t,n,r,i,o,a,s,c,u=e.attrsList;for(t=0,n=u.length;t<n;t++)if(r=i=u[t].name,o=u[t].value,Li.test(r))if(e.hasBindings=!0,(a=to(r.replace(Li,"")))&&(r=r.replace(Ki,"")),Vi.test(r))r=r.replace(Vi,""),(c=Bi.test(r))&&(r=r.slice(1,-1)),a&&(a.prop&&!c&&"innerHtml"===(r=_(r))&&(r="innerHTML"),a.camel&&!c&&(r=_(r)),a.sync&&(s=_r(o,"$event"),c?vr(e,'"update:"+('+r+")",s,null,!1,0,u[t],!0):(vr(e,"update:"+_(r),s,null,!1,0,u[t]),w(r)!==_(r)&&vr(e,"update:"+w(r),s,null,!1,0,u[t])))),a&&a.prop||!e.component&&Mi(e.tag,e.attrsMap.type,r)?ur(e,r,o,u[t],c):lr(e,r,o,u[t],c);else if(Ei.test(r))r=r.replace(Ei,""),(c=Bi.test(r))&&(r=r.slice(1,-1)),vr(e,r,o,a,!1,0,u[t],c);else{var l=(r=r.replace(Li,"")).match(zi),f=l&&l[1];c=!1,f&&(r=r.slice(0,-(f.length+1)),Bi.test(f)&&(f=f.slice(1,-1),c=!0)),pr(e,r,i,o,f,c,a,u[t])}else lr(e,r,JSON.stringify(o),u[t]),!e.component&&"muted"===r&&Mi(e.tag,e.attrsMap.type,r)&&ur(e,r,"true",u[t])}(e),e}function Xi(e){var t;if(t=mr(e,"v-for")){var n=function(e){var t=e.match(Ri);if(!t)return;var n={};n.for=t[2].trim();var r=t[1].trim().replace(Ui,""),i=r.match(Hi);i?(n.alias=r.replace(Hi,"").trim(),n.iterator1=i[1].trim(),i[2]&&(n.iterator2=i[2].trim())):n.alias=r;return n}(t);n&&k(e,n)}}function eo(e,t){e.ifConditions||(e.ifConditions=[]),e.ifConditions.push(t)}function to(e){var t=e.match(Ki);if(t){for(var n={},r=0;r<t.length;r++)n[t[r].slice(1)]=!0;return n}}function no(e){for(var t={},n=0,r=e.length;n<r;n++)t[e[n].name]=e[n].value;return t}function ro(e){return Gi(e.tag,e.attrsList.slice(),e.parent)}var io=[ii,ai,{preTransformNode:function(e,t){if("input"===e.tag){var n,r=e.attrsMap;if(!r["v-model"])return;if((r[":type"]||r["v-bind:type"])&&(n=hr(e,"type")),r.type||n||!r["v-bind"]||(n="("+r["v-bind"]+").type"),n){var i=mr(e,"v-if",!0),o=i?"&&("+i+")":"",a=null!=mr(e,"v-else",!0),s=mr(e,"v-else-if",!0),c=ro(e);Xi(c),fr(c,"type","checkbox"),Qi(c,t),c.processed=!0,c.if="("+n+")==='checkbox'"+o,eo(c,{exp:c.if,block:c});var u=ro(e);mr(u,"v-for",!0),fr(u,"type","radio"),Qi(u,t),eo(c,{exp:"("+n+")==='radio'"+o,block:u});var l=ro(e);return mr(l,"v-for",!0),fr(l,":type",n),Qi(l,t),eo(c,{exp:i,block:l}),a?c.else=!0:s&&(c.elseif=s),c}}}}];var oo,ao,so={expectHTML:!0,modules:io,directives:{model:function(e,t,n){var r=t.value,i=t.modifiers,o=e.tag,a=e.attrsMap.type;if(e.component)return gr(e,r,i),!1;if("select"===o)!function(e,t,n){var r='var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return '+(n&&n.number?"_n(val)":"val")+"});";r=r+" "+_r(t,"$event.target.multiple ? $$selectedVal : $$selectedVal[0]"),vr(e,"change",r,null,!0)}(e,r,i);else if("input"===o&&"checkbox"===a)!function(e,t,n){var r=n&&n.number,i=hr(e,"value")||"null",o=hr(e,"true-value")||"true",a=hr(e,"false-value")||"false";ur(e,"checked","Array.isArray("+t+")?_i("+t+","+i+")>-1"+("true"===o?":("+t+")":":_q("+t+","+o+")")),vr(e,"change","var $$a="+t+",$$el=$event.target,$$c=$$el.checked?("+o+"):("+a+");if(Array.isArray($$a)){var $$v="+(r?"_n("+i+")":i)+",$$i=_i($$a,$$v);if($$el.checked){$$i<0&&("+_r(t,"$$a.concat([$$v])")+")}else{$$i>-1&&("+_r(t,"$$a.slice(0,$$i).concat($$a.slice($$i+1))")+")}}else{"+_r(t,"$$c")+"}",null,!0)}(e,r,i);else if("input"===o&&"radio"===a)!function(e,t,n){var r=n&&n.number,i=hr(e,"value")||"null";ur(e,"checked","_q("+t+","+(i=r?"_n("+i+")":i)+")"),vr(e,"change",_r(t,i),null,!0)}(e,r,i);else if("input"===o||"textarea"===o)!function(e,t,n){var r=e.attrsMap.type,i=n||{},o=i.lazy,a=i.number,s=i.trim,c=!o&&"range"!==r,u=o?"change":"range"===r?Or:"input",l="$event.target.value";s&&(l="$event.target.value.trim()"),a&&(l="_n("+l+")");var f=_r(t,l);c&&(f="if($event.target.composing)return;"+f),ur(e,"value","("+t+")"),vr(e,u,f,null,!0),(s||a)&&vr(e,"blur","$forceUpdate()")}(e,r,i);else if(!Q.isReservedTag(o))return gr(e,r,i),!1;return!0},text:function(e,t){t.value&&ur(e,"textContent","_s("+t.value+")",t)},html:function(e,t){t.value&&ur(e,"innerHTML","_s("+t.value+")",t)}},isPreTag:function(e){return"pre"===e},isUnaryTag:ci,mustUseProp:vn,canBeLeftOpenTag:ui,isReservedTag:jn,getTagNamespace:Nn,staticKeys:function(e){return e.reduce(function(e,t){return e.concat(t.staticKeys||[])},[]).join(",")}(io)},co=y(function(e){return f("type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap"+(e?","+e:""))});function uo(e,t){e&&(oo=co(t.staticKeys||""),ao=t.isReservedTag||S,function e(t){t.static=function(e){if(2===e.type)return!1;if(3===e.type)return!0;return!(!e.pre&&(e.hasBindings||e.if||e.for||p(e.tag)||!ao(e.tag)||function(e){for(;e.parent;){if("template"!==(e=e.parent).tag)return!1;if(e.for)return!0}return!1}(e)||!Object.keys(e).every(oo)))}(t);if(1===t.type){if(!ao(t.tag)&&"slot"!==t.tag&&null==t.attrsMap["inline-template"])return;for(var n=0,r=t.children.length;n<r;n++){var i=t.children[n];e(i),i.static||(t.static=!1)}if(t.ifConditions)for(var o=1,a=t.ifConditions.length;o<a;o++){var s=t.ifConditions[o].block;e(s),s.static||(t.static=!1)}}}(e),function e(t,n){if(1===t.type){if((t.static||t.once)&&(t.staticInFor=n),t.static&&t.children.length&&(1!==t.children.length||3!==t.children[0].type))return void(t.staticRoot=!0);if(t.staticRoot=!1,t.children)for(var r=0,i=t.children.length;r<i;r++)e(t.children[r],n||!!t.for);if(t.ifConditions)for(var o=1,a=t.ifConditions.length;o<a;o++)e(t.ifConditions[o].block,n)}}(e,!1))}var lo=/^([\w$_]+|\([^)]*?\))\s*=>|^function\s*(?:[\w$]+)?\s*\(/,fo=/\([^)]*?\);*$/,po=/^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/,vo={esc:27,tab:9,enter:13,space:32,up:38,left:37,right:39,down:40,delete:[8,46]},ho={esc:["Esc","Escape"],tab:"Tab",enter:"Enter",space:[" ","Spacebar"],up:["Up","ArrowUp"],left:["Left","ArrowLeft"],right:["Right","ArrowRight"],down:["Down","ArrowDown"],delete:["Backspace","Delete","Del"]},mo=function(e){return"if("+e+")return null;"},yo={stop:"$event.stopPropagation();",prevent:"$event.preventDefault();",self:mo("$event.target !== $event.currentTarget"),ctrl:mo("!$event.ctrlKey"),shift:mo("!$event.shiftKey"),alt:mo("!$event.altKey"),meta:mo("!$event.metaKey"),left:mo("'button' in $event && $event.button !== 0"),middle:mo("'button' in $event && $event.button !== 1"),right:mo("'button' in $event && $event.button !== 2")};function go(e,t){var n=t?"nativeOn:":"on:",r="",i="";for(var o in e){var a=_o(e[o]);e[o]&&e[o].dynamic?i+=o+","+a+",":r+='"'+o+'":'+a+","}return r="{"+r.slice(0,-1)+"}",i?n+"_d("+r+",["+i.slice(0,-1)+"])":n+r}function _o(e){if(!e)return"function(){}";if(Array.isArray(e))return"["+e.map(function(e){return _o(e)}).join(",")+"]";var t=po.test(e.value),n=lo.test(e.value),r=po.test(e.value.replace(fo,""));if(e.modifiers){var i="",o="",a=[];for(var s in e.modifiers)if(yo[s])o+=yo[s],vo[s]&&a.push(s);else if("exact"===s){var c=e.modifiers;o+=mo(["ctrl","shift","alt","meta"].filter(function(e){return!c[e]}).map(function(e){return"$event."+e+"Key"}).join("||"))}else a.push(s);return a.length&&(i+=function(e){return"if(!$event.type.indexOf('key')&&"+e.map(bo).join("&&")+")return null;"}(a)),o&&(i+=o),"function($event){"+i+(t?"return "+e.value+"($event)":n?"return ("+e.value+")($event)":r?"return "+e.value:e.value)+"}"}return t||n?e.value:"function($event){"+(r?"return "+e.value:e.value)+"}"}function bo(e){var t=parseInt(e,10);if(t)return"$event.keyCode!=="+t;var n=vo[e],r=ho[e];return"_k($event.keyCode,"+JSON.stringify(e)+","+JSON.stringify(n)+",$event.key,"+JSON.stringify(r)+")"}var $o={on:function(e,t){e.wrapListeners=function(e){return"_g("+e+","+t.value+")"}},bind:function(e,t){e.wrapData=function(n){return"_b("+n+",'"+e.tag+"',"+t.value+","+(t.modifiers&&t.modifiers.prop?"true":"false")+(t.modifiers&&t.modifiers.sync?",true":"")+")"}}},wo=function(e){this.options=e,this.warn=e.warn||sr,this.transforms=cr(e.modules,"transformCode"),this.dataGenFns=cr(e.modules,"genData"),this.directives=k(k({},$o),e.directives);var t=e.isReservedTag||S;this.maybeComponent=function(e){return!!e.component||!t(e.tag)},this.onceId=0,this.staticRenderFns=[],this.pre=!1};function xo(e,t){var n=new wo(t);return{render:"with(this){return "+(e?Ao(e,n):'_c("div")')+"}",staticRenderFns:n.staticRenderFns}}function Ao(e,t){if(e.parent&&(e.pre=e.pre||e.parent.pre),e.staticRoot&&!e.staticProcessed)return ko(e,t);if(e.once&&!e.onceProcessed)return Oo(e,t);if(e.for&&!e.forProcessed)return So(e,t);if(e.if&&!e.ifProcessed)return Co(e,t);if("template"!==e.tag||e.slotTarget||t.pre){if("slot"===e.tag)return function(e,t){var n=e.slotName||'"default"',r=Do(e,t),i="_t("+n+(r?","+r:""),o=e.attrs||e.dynamicAttrs?Mo((e.attrs||[]).concat(e.dynamicAttrs||[]).map(function(e){return{name:_(e.name),value:e.value,dynamic:e.dynamic}})):null,a=e.attrsMap["v-bind"];!o&&!a||r||(i+=",null");o&&(i+=","+o);a&&(i+=(o?"":",null")+","+a);return i+")"}(e,t);var n;if(e.component)n=function(e,t,n){var r=t.inlineTemplate?null:Do(t,n,!0);return"_c("+e+","+To(t,n)+(r?","+r:"")+")"}(e.component,e,t);else{var r;(!e.plain||e.pre&&t.maybeComponent(e))&&(r=To(e,t));var i=e.inlineTemplate?null:Do(e,t,!0);n="_c('"+e.tag+"'"+(r?","+r:"")+(i?","+i:"")+")"}for(var o=0;o<t.transforms.length;o++)n=t.transforms[o](e,n);return n}return Do(e,t)||"void 0"}function ko(e,t){e.staticProcessed=!0;var n=t.pre;return e.pre&&(t.pre=e.pre),t.staticRenderFns.push("with(this){return "+Ao(e,t)+"}"),t.pre=n,"_m("+(t.staticRenderFns.length-1)+(e.staticInFor?",true":"")+")"}function Oo(e,t){if(e.onceProcessed=!0,e.if&&!e.ifProcessed)return Co(e,t);if(e.staticInFor){for(var n="",r=e.parent;r;){if(r.for){n=r.key;break}r=r.parent}return n?"_o("+Ao(e,t)+","+t.onceId+++","+n+")":Ao(e,t)}return ko(e,t)}function Co(e,t,n,r){return e.ifProcessed=!0,function e(t,n,r,i){if(!t.length)return i||"_e()";var o=t.shift();return o.exp?"("+o.exp+")?"+a(o.block)+":"+e(t,n,r,i):""+a(o.block);function a(e){return r?r(e,n):e.once?Oo(e,n):Ao(e,n)}}(e.ifConditions.slice(),t,n,r)}function So(e,t,n,r){var i=e.for,o=e.alias,a=e.iterator1?","+e.iterator1:"",s=e.iterator2?","+e.iterator2:"";return e.forProcessed=!0,(r||"_l")+"(("+i+"),function("+o+a+s+"){return "+(n||Ao)(e,t)+"})"}function To(e,t){var n="{",r=function(e,t){var n=e.directives;if(!n)return;var r,i,o,a,s="directives:[",c=!1;for(r=0,i=n.length;r<i;r++){o=n[r],a=!0;var u=t.directives[o.name];u&&(a=!!u(e,o,t.warn)),a&&(c=!0,s+='{name:"'+o.name+'",rawName:"'+o.rawName+'"'+(o.value?",value:("+o.value+"),expression:"+JSON.stringify(o.value):"")+(o.arg?",arg:"+(o.isDynamicArg?o.arg:'"'+o.arg+'"'):"")+(o.modifiers?",modifiers:"+JSON.stringify(o.modifiers):"")+"},")}if(c)return s.slice(0,-1)+"]"}(e,t);r&&(n+=r+","),e.key&&(n+="key:"+e.key+","),e.ref&&(n+="ref:"+e.ref+","),e.refInFor&&(n+="refInFor:true,"),e.pre&&(n+="pre:true,"),e.component&&(n+='tag:"'+e.tag+'",');for(var i=0;i<t.dataGenFns.length;i++)n+=t.dataGenFns[i](e);if(e.attrs&&(n+="attrs:"+Mo(e.attrs)+","),e.props&&(n+="domProps:"+Mo(e.props)+","),e.events&&(n+=go(e.events,!1)+","),e.nativeEvents&&(n+=go(e.nativeEvents,!0)+","),e.slotTarget&&!e.slotScope&&(n+="slot:"+e.slotTarget+","),e.scopedSlots&&(n+=function(e,t,n){var r=e.for||Object.keys(t).some(function(e){var n=t[e];return n.slotTargetDynamic||n.if||n.for||jo(n)}),i=!!e.if;if(!r)for(var o=e.parent;o;){if(o.slotScope&&o.slotScope!==Wi||o.for){r=!0;break}o.if&&(i=!0),o=o.parent}var a=Object.keys(t).map(function(e){return No(t[e],n)}).join(",");return"scopedSlots:_u(["+a+"]"+(r?",null,true":"")+(!r&&i?",null,false,"+function(e){var t=5381,n=e.length;for(;n;)t=33*t^e.charCodeAt(--n);return t>>>0}(a):"")+")"}(e,e.scopedSlots,t)+","),e.model&&(n+="model:{value:"+e.model.value+",callback:"+e.model.callback+",expression:"+e.model.expression+"},"),e.inlineTemplate){var o=function(e,t){var n=e.children[0];if(n&&1===n.type){var r=xo(n,t.options);return"inlineTemplate:{render:function(){"+r.render+"},staticRenderFns:["+r.staticRenderFns.map(function(e){return"function(){"+e+"}"}).join(",")+"]}"}}(e,t);o&&(n+=o+",")}return n=n.replace(/,$/,"")+"}",e.dynamicAttrs&&(n="_b("+n+',"'+e.tag+'",'+Mo(e.dynamicAttrs)+")"),e.wrapData&&(n=e.wrapData(n)),e.wrapListeners&&(n=e.wrapListeners(n)),n}function jo(e){return 1===e.type&&("slot"===e.tag||e.children.some(jo))}function No(e,t){var n=e.attrsMap["slot-scope"];if(e.if&&!e.ifProcessed&&!n)return Co(e,t,No,"null");if(e.for&&!e.forProcessed)return So(e,t,No);var r=e.slotScope===Wi?"":String(e.slotScope),i="function("+r+"){return "+("template"===e.tag?e.if&&n?"("+e.if+")?"+(Do(e,t)||"undefined")+":undefined":Do(e,t)||"undefined":Ao(e,t))+"}",o=r?"":",proxy:true";return"{key:"+(e.slotTarget||'"default"')+",fn:"+i+o+"}"}function Do(e,t,n,r,i){var o=e.children;if(o.length){var a=o[0];if(1===o.length&&a.for&&"template"!==a.tag&&"slot"!==a.tag){var s=n?t.maybeComponent(a)?",1":",0":"";return""+(r||Ao)(a,t)+s}var c=n?function(e,t){for(var n=0,r=0;r<e.length;r++){var i=e[r];if(1===i.type){if(Fo(i)||i.ifConditions&&i.ifConditions.some(function(e){return Fo(e.block)})){n=2;break}(t(i)||i.ifConditions&&i.ifConditions.some(function(e){return t(e.block)}))&&(n=1)}}return n}(o,t.maybeComponent):0,u=i||Io;return"["+o.map(function(e){return u(e,t)}).join(",")+"]"+(c?","+c:"")}}function Fo(e){return void 0!==e.for||"template"===e.tag||"slot"===e.tag}function Io(e,t){return 1===e.type?Ao(e,t):3===e.type&&e.isComment?(n=e,"_e("+JSON.stringify(n.text)+")"):function(e){var t=e.expression;if(2===e.type){if(e.hasChildExp){for(var n=[],r=[],i=0;i<t.length;i++){var o=t[i];o.exp?(r.length&&(n.push("_v("+r.join("+")+")"),r=[]),n.push(o.exp)):r.push(o)}return r.length&&n.push("_v("+r.join("+")+")"),n.join(",")}return"_v("+t.join("+")+")"}return"_v("+(2===e.type?t.join("+"):Po(JSON.stringify(e.text)))+")"}(e);var n}function Mo(e){for(var t="",n="",r=0;r<e.length;r++){var i=e[r],o=Po(i.value);i.dynamic?n+=i.name+","+o+",":t+='"'+i.name+'":'+o+","}return t="{"+t.slice(0,-1)+"}",n?"_d("+t+",["+n.slice(0,-1)+"])":t}function Po(e){return e.replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")}new RegExp("\\b"+"do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,super,throw,while,yield,delete,export,import,return,switch,default,extends,finally,continue,debugger,function,arguments".split(",").join("\\b|\\b")+"\\b");function Eo(e,t){try{return new Function(e)}catch(n){return t.push({err:n,code:e}),C}}function Lo(e){var t=Object.create(null);return function(n,r,i){(r=k({},r)).warn;delete r.warn;var o=r.delimiters?String(r.delimiters)+n:n;if(t[o])return t[o];var a=e(n,r),s={},c=[];return s.render=Eo(a.render,c),s.staticRenderFns=a.staticRenderFns.map(function(e){return Eo(e,c)}),t[o]=s}}var Ro,Ho,Uo=(Ro=function(e,t){var n=Yi(e.trim(),t);!1!==t.optimize&&uo(n,t);var r=xo(n,t);return{ast:n,render:r.render,staticRenderFns:r.staticRenderFns}},function(e){function t(t,n){var r=Object.create(e),i=[],o=[];if(n)for(var a in n.modules&&(r.modules=(e.modules||[]).concat(n.modules)),n.directives&&(r.directives=k(Object.create(e.directives||null),n.directives)),n)"modules"!==a&&"directives"!==a&&(r[a]=n[a]);r.warn=function(e,t,n){(n?o:i).push(e)};var s=Ro(t.trim(),r);return s.errors=i,s.tips=o,s}return{compile:t,compileToFunctions:Lo(t)}})(so).compileToFunctions;function Bo(e){return(Ho=Ho||document.createElement("div")).innerHTML=e?'<a href="\n"/>':'<div a="\n"/>',Ho.innerHTML.indexOf("&#10;")>0}var zo=!!E&&Bo(!1),Vo=!!E&&Bo(!0),Ko=y(function(e){var t=In(e);return t&&t.innerHTML}),Jo=ln.prototype.$mount;return ln.prototype.$mount=function(e,t){if((e=e&&In(e))===document.body||e===document.documentElement)return this;var n=this.$options;if(!n.render){var r=n.template;if(r)if("string"==typeof r)"#"===r.charAt(0)&&(r=Ko(r));else{if(!r.nodeType)return this;r=r.innerHTML}else e&&(r=function(e){if(e.outerHTML)return e.outerHTML;var t=document.createElement("div");return t.appendChild(e.cloneNode(!0)),t.innerHTML}(e));if(r){var i=Uo(r,{outputSourceRange:!1,shouldDecodeNewlines:zo,shouldDecodeNewlinesForHref:Vo,delimiters:n.delimiters,comments:n.comments},this),o=i.render,a=i.staticRenderFns;n.render=o,n.staticRenderFns=a}}return Jo.call(this,e,t)},ln.compile=Uo,ln});
!function(){var e=usf.settings,t=usf.event,s=usf.templates,i=e["translation_"+usf.platform.locale];if(!i)for(var r in e)if(r.startsWith("translation")){i=e[r];break}e.translation=i;var a=usf.utils,o,n=usf.platform,l=usf.query,c=usf.queryRewriter,u=["template","created","beforeMounted","mounted","beforeUpdate","updated","render","beforeDestroy","destroy","ref","key","slot","directives","on","attrs"];function h(e,t){for(var s=0;s<t.length;s++)e.push(t[s])}function d(e){return"[object Function]"===Object.prototype.toString.call(e)}function f(e){return"string"==typeof e}function m(e,t,s){var i=t[s];if(i){var r=e[s];if(!r){if(d(i))return void(e[s]=i);e[s]=r={}}for(var a in i){var o=i[a];r[a]||(r[a]=o)}}}function p(e,t,s){var i=$r.getBaseType(e);if(i){if(s){var r=i[s][t],a=i.mixins;if(!r&&a)for(var o=0;o<a.length;o++)if((r=a[o][s])&&(r=r[t]))return r;return r}return i[t]}return null}Object.assign(window.usf,{register:function(e,t,s){var i;if(f(e)?(i=eval(e),i.__typeName=e,i.fullName=function(){return i.__typeName}):i=e,i.__class=!0,t)for(var r in i.__baseType=t,["methods","props","computed","events","model","data","watch","inject","provide"].forEach(e=>m(i,t,e)),t.mixins&&(i.mixins||(i.mixins=[]),h(i.mixins,t.mixins)),t){var a=t[r];!i[r]&&u.includes(r)&&(i[r]=a)}return s&&RVue.component(s,i),i},base:function(e,t,s,i,r){var a=p(t,s,r);if(!a)throw new Error("Base method named '"+s+"' not found.");return i?a.apply(e,i):a.apply(e)}});var g={props:{value:String,options:Array,placeholder:String},data:()=>({show:!1}),methods:{onInput(e){a.stopEvent(e),this.onClose(),this.$emit("input",e.target.getAttribute("data-value"))},onToggle(e){if(a.stopEvent(e),!this.show){var t=this.$refs.p;usf.isMobile?document.body.appendChild(t):this.$el.appendChild(t)}setTimeout(()=>{var e=this.show=!this.show;document.body.classList[e?"add":"remove"]("usf-has-popup"),document.body[e?"addEventListener":"removeEventListener"]("mousedown",this.onClose)},0)},onClose(e){if(e){var t=e.target;if(t.closest(".usf-c-select")&&!t.classList.contains("usf-remove"))return}this.show=!1,document.body.classList.remove("usf-has-popup"),document.body.removeEventListener("mousedown",this.onClose)}},render(e){var t=this.options;if(t){var s;s=usf.isMobile?this.placeholder:(s=t.find(e=>e.value==this.value))?s.label:this.placeholder;for(var i=[],r=0;r<t.length;r++){var a=t[r];i.push(e("button",{class:{"usf-c-select__btn usf-btn":!0,"usf-selected":this.value===a.value},domProps:{innerHTML:a.label},on:{click:this.onInput},attrs:{"data-value":a.value}}))}return e("div",{class:"usf-c-select"+(this.show?" usf-opened":"")},[e("button",{class:"usf-c-select__input-value usf-btn",on:{click:this.onToggle},domProps:{innerHTML:s}}),e("div",{class:"usf-popover",ref:"p",attrs:{"aria-hidden":!this.show}},[e("div",{class:"usf-body"},[usf.isMobile?e("div",{class:"usf-c-select__header"},[e("div",{class:"usf-remove",on:{click:this.onClose}}),e("span",{class:"",domProps:{innerHTML:this.placeholder}})]):null,e("div",{class:"usf-c-select__content"},[e("div",{class:"usf-c-select__list"},i)])])])])}}};usf.components.DropDown=usf.register(g,null,"usf-dropdown");var v={props:{value:Boolean,label:String,name:String},methods:{onInput(e){this.$emit("input",e.target.value)}},render(e){return e("div",{class:"usf-c-checkbox"},[e("div",{class:"usf-c-inner-option"},[e("input",{attrs:{type:"checkbox",name:this.name},props:{value:this.value},on:{input:this.onInput}})]),e("span",{domProps:{innerHTML:this.label}})])}};usf.components.CheckBox=usf.register(g,null,"usf-checkbox");var b={props:{tooltip:String},render(e){return e("div",{class:"usf-c-tooltip"},[e("div",{class:"usf-c-tooltip__popup",domProps:{innerHTML:this.tooltip}})])}},y,w,_,I,S,x,P;function F(e,t){return Math.ceil(e/t)*t}function C(e,t){var s,i=t.innerSymbols;if(i){var r=Math.log10(e)/3|0;if(s=i[r],r)e/=Math.pow(10,3*r)}else s="";return We(e,t.decimals)+s}function U(e,t,s){return[e("span",{class:"usf-slider-pip__value-wrapper"},[s.prefix?e("span",{class:"usf-slider-pip__prefix"},[s.prefix]):null,e("span",{class:"usf-slider-pip__value"},[C(s.converter(t),s)]),s.suffix?e("span",{class:"usf-slider-pip__suffix"},[s.suffix]):null])]}usf.components.HelpTip=usf.register(b,null,"usf-helptip");var L={props:{value:Array,min:Number,max:Number,pips:Number,step:Number,decimals:Number,converter:Function,symbols:[Array,String],prefix:String,suffix:String,noAbbreviation:Boolean,color:String},data(){var e=this.symbols;return e&&(Array.isArray(e)||(e=(","+e).split(","))),{dragging:!1,innerSymbols:e}},methods:{onKeyDown(e){var t,s,i;switch(e.keyCode){case 37:t=-this.step;break;case 39:t=this.step;break;case 27:return(r=e.target===this.$refs.l)?(s=this.min,i=this.value[1]):(s=this.value[0],i=this.max),this.$emit("input",[s,i]),void this.$emit("change",[s,i])}if(void 0!==t){var r=e.target===this.$refs.l,a=this.value;r?(s=a[0]+t,i=a[1],s<this.min?s=this.min:s>i&&(s=i)):(s=a[0],(i=a[1]+t)<s?i=s:i>this.max&&(i=this.max)),s==a[0]&&i===a[1]||(this.$emit("input",[s,i]),clearTimeout(this._timeout),this._timeout=setTimeout(()=>this.$emit("change",[s,i]),100))}},onMouseUp(e){this.$emit("change",[S,x]),this.dragging=!1,this.clearDrag()},onMouseMove(e){var t=(e.touches?e.touches[0].clientX:e.clientX)-y,s=this.value[0],i=this.value[1],r=this.min,a=this.max;w?((s=_+F(t/_width*(a-r),this.step))<r&&(s=r),s>i&&(s=i)):((i=I+F(t/_width*(a-r),this.step))>a&&(i=a),i<s&&(i=s)),S===s&&x===i||(S=s,x=i,this.$emit("input",[s,i]))},onMinMouseDown(e){this.onHandleMouseDown(e,!0)},onMaxMouseDown(e){this.onHandleMouseDown(e,!1)},onHandleMouseDown(e,t){if(!this.dragging){var s=e.target;s.style.zIndex=2,this.$refs[s===this.$refs.l?"r":"l"].style.zIndex=1,this.dragging=!0,y=e.touches?e.touches[0].clientX:e.clientX,w=t,_width=this.$el.clientWidth,_=this.value[0],I=this.value[1];var i=this.onMouseUp,r=this.onMouseMove;P={mouseup:i,mousemove:r,touchend:i,touchmove:r},a.on(document.body,P,{passive:!0})}},clearDrag(){a.off(document.body,P)}},beforeDestroy(){this.clearDrag()},render(e){for(var t=this.min,s=this.max,i=this.color,r=[],a=s-t,o=a/this.pips,n=0;n<this.pips;n++){var l=n*o,c=t+l;if(r.push(e("div",{style:"left:"+100*l/a+"%",class:"usf-c-slider__pip"},U(e,c,this))),!n&&a<=this.step)break}r.push(e("div",{style:"right:0",class:"usf-c-slider__pip"},U(e,s,this)));var u=this.value[0],h=this.value[1];u<t&&(u=t),u>s&&(u=s),h>s&&(h=s),h<t&&(h=t);var d=100*(u-t)/a+"%",f=100*(h-t)/a+"%";return e("div",{class:"usf-c-slider"},[r,e("div",{class:"usf-c-slider__track"},[e("div",{class:"usf-active",style:{left:d,width:100*(h-u)/a+"%",backgroundColor:i}})]),e("div",{class:"usf-c-slider__handle usf-c-slider__handle-min usf-c",ref:"l",attrs:{tabindex:0},style:{left:d,borderColor:i},on:{"&mousedown":this.onMinMouseDown,"&touchstart":this.onMinMouseDown,keydown:this.onKeyDown}}),e("div",{class:"usf-c-slider__handle usf-c-slider__handle-max usf-c",ref:"r",attrs:{tabindex:0},style:{left:f,borderColor:i},on:{"&mousedown":this.onMaxMouseDown,"&touchstart":this.onMaxMouseDown,keydown:this.onKeyDown}})])}};usf.components.Slider=usf.register(L,null,"usf-slider");var M=navigator.userAgent,T=M.includes("iPad")||M.includes("iPhone");function k(e,t){var s=0,i=0,r=e;if(t){for(;e&&!isNaN(e.offsetLeft)&&!isNaN(e.offsetTop)&&(s+=e.offsetLeft,i+=e.offsetTop,(e=e.offsetParent)!==t););for(r=r.parentNode;r&&!isNaN(r.scrollLeft)&&!isNaN(r.scrollTop)&&(s-=r.scrollLeft,i-=r.scrollTop,r!==t);)r=r.parentNode}else{var a=e.getBoundingClientRect();s=a.x+window.scrollX,i=a.y+window.scrollY}return{x:s,y:i}}var N=/\{(\d+)(:[^\}]+)?\}/g,D={}.toString,R;function $(e,t,s){}function O(e,t,s){}function B(e,t,s){if(t){if("[object Date]"===D.call(e))return $(e,t,s);if($r_isNumeric(e))return O(e,t,s)}return void 0!==e?e:""}var E={url:e.resUrl+"no-image.svg",width:360,height:260};function H(){for(var e=document.head.children,t=0;t<e.length;t++){var s=e[t];if("SCRIPT"==s.tagName&&-1!==s.text.indexOf("usf-license.js"))return!0}}Object.assign(usf.platform,{get addToCartUrl(){return n.baseUrl+"/cart/add"},get searchUrl(){return n.baseUrl+"/search"},emptyImage:E,getProductUrl(e,t,s){var i;return i=!n.useProductsUrl&&e&&"all"!==e&&-1===e.indexOf("/")?n.baseUrl+"/collections/"+e+"/products/"+t.urlName:n.baseUrl+"/products/"+t.urlName,s&&(i+="?variant="+s.id),i},getImageUrl(t,s){if(!t.includes("shopify.com")||t.includes("/assets/"))return t;var i=t.lastIndexOf(".");if("list"===s)switch(e.search.imageSizeType){case"fixed":s="_"+e.search.imageSize+"x";break;default:s=""}else s="small"===s?"_small":s?"_"+s+"x":"";return t.substring(0,i)+s+t.substring(i)},getCollectionUrl(e){if("number"==typeof e){var t;for(var s in usf.collectionsByUrlName){var i=usf.collectionsByUrlName[s];if(i.id===e){e=i,t=!0;break}}t||(e={urlName:"all"})}var r=e.urlName||e;return n.baseUrl+"/collections/"+r},getPageUrl(e){var t=n.baseUrl;switch(e.type){case"Article":return t+"/blogs/"+e.urlName;case"Page":e=e.urlName}return t+"/pages/"+e}}),window.addEventListener("load",function(){a.registerScriptsLoadedCallback(window._usfActive,"usf-license",function(){},8e3,function(){window._usfActive||H()||n.redirectToOriginalView()})});var q=["price"],V;function z(e){var t;return void 0!==e.min?(t=(e.minInclusive?":":"")+e.min+" ",e.max<Ae&&(t+=(e.maxInclusive?":":"")+e.max),t+=" "+e.label):t=e.label,t}function A(e,t,s,i){var r=t.inStockLabel;if(void 0!==r){var a=t.outOfStockLabel;return"1"===e.label?r:a}return e.label||"reviewRating"!==t.facetName?void 0!==e.min?j(e,t):X(e.label,t):G(e,t.ratingColor)}function j(t,s){var i=t.min,r=t.max,a=q.includes(s.facetName);return a?(i=We(i*e.currencyRate),i=qe(e.priceFormat,i)):i=We(i),r!==Ae&&(a?(r=We(r*e.currencyRate),r=qe(e.priceFormat,r)):r=We(r)),qe(t.label,i,r)}function W(t,s,i){if(t.numericRange){var r=i.indexOf(" ");if(-1!==r){var a,o,n=i.substr(0,r),l=i.indexOf(" ",r+1);-1===l?a=i.substr(r+1):(a=i.substr(r+1,l-r-1),o=i.substr(l+1));var c=":"===n[0],u=":"===a[0];n=Ge(n),a=Ge(a);var h=q.includes(s),d=Y(h,t.valueFormula),f=d(parseFloat(n)),m=a.length?d(parseFloat(a)):-1;if("reviewRating"===s&&!o)return G({min:f,minInclusive:c,max:m,maxInclusive:u},t.ratingColor);o||(f<t.min&&(n=t.min.toString()),m>t.max&&(a=t.max.toString()),o=t.rangeFormat||"{0} - {1}");var p,g=t.range;return g&&(p=g[2]),h?(n=qe(e.priceFormat,We(f,p)),a&&(a=qe(e.priceFormat,We(m,p)))):(n=We(f,p),a&&(a=We(m,p))),qe(o,n,a)}}else{if(void 0!==t.inStockLabel)return"1"===i?t.inStockLabel:t.outOfStockLabel;if("collections"===t.facetName){var v=parseInt(i);if(!Number.isNaN(v)){var b=usf.collectionsByUrlName;for(var y in b){var w=b[y];if(w.id===v){i=w.title;break}}}}}return X(i,t)}function X(e,t){var s=t.valuesTransformation;return s?'<span class="usf-'+s.toLowerCase()+'">'+e+"</span>":e}function K(){setTimeout(()=>{usf_container.getBoundingClientRect().top<=-50&&a.scrollTo(usf_container.scrollTop,800)},100)}function G(e,t){var s;s=e.minInclusive||!e.maxInclusive?e.min:e.max;for(var i='<span class="usf-stars" style="color:'+t+'">',r=1;r<=5;r++)i+='<i class="usf-icon usf-icon-star'+(r>s?"-empty":"")+'"></i>';return i+="</span>"}function Y(e,t){return t||e?function(s){return e&&(s=a.convertPrice(s)),t&&(eval("var value="+s),s=eval("("+t+")")),s}:e=>e}var J={template:s.filtersBreadcrumb,inject:{root:{default:null}},created(){this.loc=i},computed:{facetFilterIds(){var e=this.root.facetFilters,t=[];for(var s in e)t.push(parseInt(s));return t}}};usf.components.FacetFilterBreadcrumb=usf.register(J,null,"usf-filter-breadcrumb");var Q={props:{facet:Object,terms:Object},template:s.filter,inject:{root:{default:null}},created(){var e=this.facet;this.loc=i,this.id=e.id,this.hasLazyLoad=e.maxHeight&&!e.maxItems&&"List"===e.display&&e.labels.length>24,this.maxItems=this.hasLazyLoad?24:e.maxItems,this.loadedItemsCount=this.maxItems},data(){this.facet;return{loadedItemsCount:this.maxItems}},computed:{rangeConverter(){return Y(this.isPrice,this.facet.valueFormula)},rangeResolver(){return Y(this.isPrice,this.facet.inverseFormula)},canShow(){var e=this.facet;return this.isRange?e.min!==e.max:e.navigationCollections?this.options.length:e.labels.length},rangeDecimals(){var e=this.facet.range[2];return"number"!=typeof e?1:e},range(){var e=this.facet,t=e.min,s=e.max,i=t,r=s,a=this.root.facetFilters;if(a){var o=a[e.id];if(o){var n=(o=o[1])[0].split(" ");i=parseFloat(Ge(n[0])),r=parseFloat(Ge(n[1])),i<t&&(i=t),r>s&&(r=s)}}return[i,r]},isRange(){var e=this.facet;return void 0!==e.min&&"List"!==e.display},hasRangeInputs(){var e=this.facet;return!e.valueFormula||e.inverseFormula},isPrice(){return q.includes(this.facet.facetName)},hasSearchBox(){var e=this.facet;return usf.isMobile?e.searchBoxOnMobile:e.searchBoxOnPc},isInBreadcrumb(){var e=this.root.facetFilters;return e&&e[this.facet.id]},options(){var e,t,s=this.facet,i=s.sort,r=s.labels;if(s.navigationCollections){var a=se(s);if(a)return a}if(t=s.manualValues){for(var o=[],n=0;n<t.length;n++){var l=r.find(e=>e.label===ml);l&&o.push(l)}if(!o.length)return;r=o,s.sortManualValues||(i=null)}else if(e=s.excludedValues)for(n=r.length-1;n>=0;n--)e.includes(r[n].label)&&r.splice(n,1);null!==i&&(r=r.slice(0,r.length)).sort((e,t)=>{var s=e.label.toLowerCase(),r=t.label.toLowerCase();switch(i){case 1:return s<r?-1:s>r?1:0;case 2:return s<r?1:s>r?-1:0;case 3:return t.value-e.value;case 4:return e.value-t.value}});var c=this.term;return c&&(c=c.toLowerCase(),r=r.filter(e=>e.label.toLowerCase().includes(c))),r},visibleOptions(){this.facet;var e=this.options,t=this.maxItems;if(t&&e.length>t){var s=this.loadedItemsCount;s<e.length&&(e=e.slice(0,s))}return e},term:{get(){return this.root.terms[this.id]},set(e){this.$set(this.root.terms,this.id,e)}},collapsed(){var e=this.root,t=e.collapsed[this.id];return void 0===t&&(t=this.facet.collapseOnPc||e.horz),t},isMoreVisible(){var e=this.facet,t=this.options,s=(e.id,e.maxItems);return!!(s&&t.length>s)&&(!(this.loadedItemsCount>=t.length)&&s)}},mounted(){if(this.hasLazyLoad){var e=this.$refs.values;usf.isMobile&&(e=e.closest(".usf-body")),e&&(this._scrollEl=e,a.on(e,"scroll",this.onScroll))}},beforeDestroy(){this._scrollEl&&a.off(this._scrollEl,"scroll",this.onScroll)},methods:{onShowMore(e){var t=this.facet;this.loadedItemsCount+=t.maxItems,this.$nextTick(()=>this.$refs.values.scrollTop=this.$refs.values.scrollHeight),a.stopEvent(e)},onScroll(e){var t=this._scrollEl,s=t.scrollTop+t.offsetHeight;if(this.loadedItemsCount<this.options.length&&s+5>t.scrollHeight){this.loadedItemsCount+=this.maxItems;var i=t.parentNode.classList;i.add("usf-with-loader"),setTimeout(function(){i.remove("usf-with-loader")},300)}},onExpandCollapse(){var e=this.root,t=this.id,s=e.collapsed[t];void 0===s&&(s=this.collapsed),s?(e.horz&&(e.facets.forEach(t=>{this.$set(e.collapsed,t.id,1)}),V||(V=(t=>{t.target.closest(".usf-facet")||(e.facets.forEach(t=>{this.$set(e.collapsed,t.id,1)}),a.off(document,"click",V))})),setTimeout(()=>a.on(document,"click",V),400)),this.$set(e.collapsed,t,0)):this.$set(e.collapsed,t,1)},onClear(e){this.root.removeFacetFilter(this.facet.id,null),a.stopEvent(e)},onRangeSliderInput(e){var t=this.root,s=t.facetFilters,i=this.facet,r=i.id,a=this.rangeDecimals;s||(t.facetFilters=s={});var o=s[r];o||(o=[i.facetName,""],this.$set(s,r,o)),this.$set(o,1,[":"+e[0].toFixed(a)+" :"+e[1].toFixed(a)])},onRangeInput(t,s,i){var r=this.facet,a=this.root.__qr;if(r.inverseFormula){var o=this.rangeResolver(parseFloat(t.target.value)),n=i?[this.range[0],this.range[1]=o]:[this.range[0]=o,this.range[1]];return this.onRangeSliderInput(n),void this.onRangeSliderChange(n)}var l=r.min,c=r.max,u=this.root,h=this.range[0],d=this.range[1],f=r.id,m=u.facetFilters,p=parseFloat(t.target.value);if(isNaN(p))t.target.value=s.toString();else{p>c?p=c:p<l&&(p=l),1===i&&p<h?p=h:!i&&p>d&&(p=d);var g=[h,d];if(g[i]=p,this.isPrice&&g[0]===l&&g[1]===c)m&&u.$delete(m,f);else{var v=":"+g[0]+" :"+g[1];m||(u.facetFilters=m={});var b=m[f];b||(b=[r.facetName,""],u.$set(m,f,b)),u.$set(b,1,[v]),_usfaq.track("facetFilter",{term:a.term,filterFacetLabel:v.replace(/\:/g,"").replace(" ",":"),filterFacetName:r.title})}a.facetFilters=m,e.filterNavigation.scrollUpOnChange&&K()}},onRangeSliderChange(t){var s=this.root.facetFilters;if(s){var i=this.root.__qr,r=this.facet,o=r.id;if(this.isPrice&&t[0]===r.min&&t[1]===r.max)this.$delete(s,o);else if(s[o]){var n=a.formatNumber,l=this.rangeDecimals;_usfaq.track("facetFilter",{term:i.term,filterFacetLabel:n(t[0],l)+":"+n(t[1],l),filterFacetName:r.title})}i.facetFilters=s,e.filterNavigation.scrollUpOnChange&&K()}}}};usf.components.Filter=usf.register(Q,null,"usf-filter");var Z={template:usf.templates.filterOption,props:{facet:Object,option:Object},inject:{root:{default:null}},created(){var e=this.facet,t=e.displayMode;this.isSwatch=2===t,this.isBox=1===t;var s=this.option,r=s.children;this.children=r&&r.length?r:null;var a=e.swatchImages?e.swatchImages[e.labelPrefix?e.labelPrefix+s.label:s.label]:null;!a||a.color||a.imageUrl||(a=null),this.swatchImage=a,this.swatchStyle=a?a.imageUrl?{backgroundImage:"url("+a.imageUrl+")"}:{backgroundColor:a.color}:null,this.label=r?s.collection.label:A(s,this.facet,this.swatchImage,usf.isMobile),this.loc=i},data(){var e=this.option,t=e.children;return{collapsed:!(t=t&&t.length?t:null)||e.collection&&n.collection!==e.collection.urlName}},computed:{isSelected(){var e,t=this.root,s=this.facet,i=s.id,r=this.option;r.children&&(r=r.collection);var a=t.facetFilters?t.facetFilters[i]:null;a&&(a=a[1],e=(e=r.id)?e.toString():z(r));var n=a&&a.includes(e);if(o&&!n&&s.navigationCollections){var l=usf.collectionsByUrlName[o];n=l&&r.id===l.id}return n}},methods:{getChildLabel(e){switch(this.facet.navigationCollectionsChildType){case"link":var t=e.label,s=t.indexOf("](");return-1!==s?t.substring(1,s):t}return e.label},isChildSelected(e){return this.isSelected&&"tags"===this.facet.navigationCollectionsChildType&&ee(e.label)===n.tagUrlName},onChildClick(e){var t=this.facet,s=this.option.collection;switch(t.navigationCollectionsChildType){case"tags":location=n.getCollectionUrl(s.urlName+"/"+ee(e.label));break;case"productType":location=n.getCollectionUrl(s.urlName+"/ProductType:"+e.label);break;case"vendor":location=n.getCollectionUrl(s.urlName+"/Vendor:"+e.label);break;case"collections":location=n.getCollectionUrl(e.urlName);break;case"link":var i=e.label,r=i.indexOf("](");location=-1!==r?i.substring(r+2,i.length-1):i}},onToggleChildren(e){this.collapsed=!this.collapsed,a.stopEvent(e)},onToggle(){var t=this.root,s=this.option,i=this.facet;if(i.navigationCollections){var r=s.collection,a=new usf.URLSearchParams(location.search);return a.delete("page"),void(location=n.getCollectionUrl(r?r.urlName:s.id)+a.toString())}var o=s.id;o=o?o.toString():z(s);var l,c=t.facetFilters,u=i.id;c&&(l=c[u]);var h=i.multiple,d=!0;if(l){var f=l[1],m=f.indexOf(o);-1===m?(h||f.splice(0,f.length),f.push(o)):(f.splice(m,1),d=!1),f.length||delete c[u]}else l=[i.facetName,[o]],c||(c={}),c[u]=l;c&&(t.__qr.facetFilters=c),i.multiple||(usf.isMobile?t.mobileSelectedFacetId=null:t.horz&&this.$set(t.collapsed,i.id,1)),d&&_usfaq.track("facetFilter",{term:t.__qr.term,filterFacetLabel:z(s),filterFacetName:i.title}),e.filterNavigation.scrollUpOnChange&&K()}}};function ee(e){return e.toLowerCase().replace(/[\s\:]/g,"-").replace(/--/g,"-")}usf.components.FilterOption=usf.register(Z,null,"usf-filter-option");var te={template:s.filters,data:()=>({facets:null,facetFilters:null,collapsed:{},loadedItems:{},terms:{},mobileSelectedFacetId:null,horz:e.filters.horz}),beforeMount(){this.loc=i,this.__init();var e=this.__qr;this.facetFilters=e.facetFilters,e.addChangedEventListener(()=>{this.facetFilters=e.facetFilters})},mounted(){usf.isMobile&&document.body.appendChild(this.$el),t.add("mobile_changed",this.__onMobileChanged)},beforeDestroy(){t.remove("sr_updated",this.__onSrUpdated),t.remove("mobile_changed",this.__onMobileChanged);try{document.body.removeChild(this.$el)}catch(e){}},provide(){return{root:this}},computed:{isSingleFacetMode(){return this.facets&&1===this.facets.length},mobileSelectedFacet(){return this.facets?this.facets.find(e=>e.id===this.mobileSelectedFacetId):null}},methods:{__init(){if(t.add("sr_updated",this.__onSrUpdated),usf.search){var e=usf.search.result;e&&this.__onSrUpdated(null,{facets:e.facets})}this.__qr=c},__onSrUpdated(e,t){var s=t.facets;if(s){if(!this.facets&&this.horz)for(var i=0;i<s.length;i++)this.$set(this.collapsed,s[i].id,1);this.facets=[];for(i=0;i<s.length;i++)this.facets[i]=s[i]}else this.facets=null},__onMobileChanged(e,t){if(usf.isMobile)document.body.appendChild(this.$el);else{var s,i=this.$parent;do{var r=i.$el;if(s=r.querySelector(".usf-facets-container"))break;"usf_container"===r.id&&(s=r),i=i.$parent}while(i);s.insertBefore(this.$el,s.children[0])}},canShowFilter(e){if(void 0!==e.min)return e.min!==e.max;if(e.navigationCollections){var t=e.navigationCollectionsMenu;if(t)return t.length}return e.labels.length},formatBreadcrumbLabel:W,formatFacetLabel:X,onMobileBack(e){e||this.singleFacetMode?this.$el.classList.remove("usf-on"):this.mobileSelectedFacetId=null},onMobileSelectFacet(e){this.mobileSelectedFacetId=e.id},applyFacetFilters(e){this.__qr.facetFilters=e},selectFacetFilter(e){var t,s=e.facetName,i=e.id,r=this.facetFilters;r&&(t=r[i]),t||(t=[s,[]],r||(r={}),r[i]=t);var a=t[1],o="collections"===s;e.labels.forEach(e=>{-1===a.indexOf(e)&&a.push(o?e.id:e.label)}),this.__qr.facetFilters=r},removeFacetFilter(e,t){var s=this.facetFilters;if(s){if(t){var i=s[e];if(!i)return;var r=i[1],a=r.indexOf(t);-1===a?r.push(label):r.splice(a,1),r.length||delete s[e]}else delete s[e];this.__qr.facetFilters=s}},removeAllFacetFilters(){this.__qr.removeAllFacetFilters()}}};function se(e){var t=e.navigationCollectionsMenu;if(t){for(var s=e.labels,i=[],r=0;r<t.length;r++){var a=t[r],o=s.find(e=>e.id===a.collection.id);e.navigationCollectionsKeepMain&&!o?i.push(a):i.push(Object.assign({id:o.id,value:o.value},a))}return i}}usf.components.Filters=usf.register(te,null,"usf-filters");var ie={data(){var e=c.term;return{loader:!1,itemsLoaded:0,itemsOffset:0,term:e,termModel:e,sortBy:c.sort,view:c.view,facetFilters:c.facetFilters,page:c.page,itemsPerPage:c.itemsPerPage,take:c.take,result:null,hasFacets:!0}},created(){var t=e.search.sortFields;if(t){for(var s=[],r=0;r<t.length;r++){var a=t[r],o=i["sortBy_"+a]||a;s[r]={label:o,value:a}}this.sortByOptions=s}else this.sortByOptions=null;this.loc=i},computed:{hasResults(){return this.result&&this.result.items.length},noFacets(){return!this.hasFacets&&!this.facetFilters},filtersCount(){var e=this.facetFilters;return e?Object.keys(e).length:0}}},re=e.search.more,ae="infinite"===re,oe=ae||"more"===re;const ne=".usf-results [data-usf-pid]";var le={mixins:[ie],template:s.searchResults,computed:{pagesTotal(){var e=this.result;return e&&e.total?Math.floor((e.total-1)/this.itemsPerPage+1):0}},created(){usf.search=this,this.showSearchBox=o?e.search.showSearchInputOnCollectionPage:e.search.showSearchInputOnSearchPage},beforeMount(){l.changed.push(()=>{var e=l.getChanges();if(e.length&&(1!==e.length||"usf_view"!==e[0])){l.snapshot();var t=this.term;if(this.term=this.termModel=c.term,this.sortBy=c.sort,this.view=c.view,this.facetFilters=c.facetFilters,oe){var s=this.take,i=this.take=c.take;if(i>s)return void usf.fetch(this,1);if(i<s&&t==this.term&&this.result)return this.result.items.splice(i,this.result.items.length-i),void(this.itemsLoaded=i);c.take=0,this.itemsOffset=0}else this.page=c.page,this.itemsPerPage=c.itemsPerPage;c.isViewChanged(e)&&this.refresh()}}),T&&window.addEventListener("pageshow",()=>{pe=0,l.snapshot(),t.raise("resetstate")}),l.snapshot(),this.refresh()},mounted(){setTimeout(()=>{if((ae||oe)&&ve(this),a.installSearchInput(this.$refs.searchInput),e.showGotoTop){var t=document.createElement("div");t.classList.add("usf-goto-top"),document.body.appendChild(t),a.on(t,"click",function(e){a.scrollTo(0,800)}),a.on(document,"scroll",function(e){window.scrollY>170?document.body.classList.add("usf-with-goto-top"):document.body.classList.remove("usf-with-goto-top")},{passive:!0})}},100)},methods:{onInfiniteLoad(){this.onLoadMore()},onRedirect(e){location=e},onSortByChanged(e){c.sort=e===this.sortByOptions[0].value?"":e},clearSearch(){this.termModel="",c.term="";var e=this.$refs.searchInput;e.value="",e.focus()},onGridViewClick(){c.view="",this.$nextTick(()=>{t.raise("sr_viewChanged",this,"grid")})},onListViewClick(){c.view="list",this.$nextTick(()=>{t.raise("sr_viewChanged",this,"list")})},onLoadMore(){c.take=this.itemsLoaded+e.search.itemsPerPage},onLoadPrev(){this.itemsOffset-=e.search.itemsPerPage,usf.fetch(this,2)},refresh(){usf.fetch(this)},onMobileToggle(){usf.app.hasFilters=!0,setTimeout(()=>document.querySelector(".usf-sr-filters").classList.toggle("usf-on"),0)}}};usf.components.SearchResults=usf.register(le,null,"usf-sr");var ce={props:{position:String,banner:Object},template:s.searchResultsBanner},ue,he,de,fe,me,pe;function ge(e){if((he||(he=document.getElementById("usf-sr-top-loader")),he)&&he.getBoundingClientRect().top>=0){ue=!1;var t=document.querySelector(ne);if(t){me=t.getAttribute("data-usf-pid");var s=t.getBoundingClientRect();fe=s.top,e.onLoadPrev()}return}}function ve(e){function s(){if(de=null,he=null,ue=!0,fe){var e=document.querySelector('.usf-results [data-usf-pid="'+me+'"]').getBoundingClientRect();window.scrollBy(0,e.top-fe),fe=0}}function i(){setTimeout(s,100)}t.add("sr_updated",i),e.result&&i(),document.addEventListener("scroll",function(t){ae&&!e.loader&&e.itemsLoaded<e.result.total&&(de||(de=document.querySelector(".usf-sr-paging")),de&&de.getBoundingClientRect().top<=window.innerHeight&&e.onInfiniteLoad());ue&&ge(e)},{passive:!0}),window.addEventListener(Ye,be)}function be(){for(var e=usf_container.querySelectorAll(ne),t=0;t<e.length;t++){var s=e[t],i=s.getBoundingClientRect();if(i.top>0||i.bottom>0){var r=s.getAttribute("data-usf-pid");return void ye(usf.search.itemsOffset+t,r,i.y)}}}function ye(t,s,i){if(!pe){pe=1;var r=e.search.itemsPerPage,a={id:s,take:(Math.floor(t/r)+1)*r,y:i};sessionStorage.setItem("usfVP",JSON.stringify(a))}}function we(e,t){return{type:"page",page:e,current:t}}usf.components.SearchResultsBanner=usf.register(ce,null,"usf-sr-banner");var _e={props:{page:Number,pagesTotal:Number,pagesToDisplay:{type:Number,default:4},sidePagesToDisplay:{type:Number,default:1}},data:()=>({loc:i}),template:s.searchResultsPages,computed:{elements(){var e=this.pagesTotal;if(e<=1)return[];this.loc;var t=this.page,s=this.pagesToDisplay,i=this.sidePagesToDisplay,r=t>s/2+2&&e>s+1,a=e>s+1&&t<e-(s/2+1),o=[];t>1&&o.push({type:"prev"});var n=1;if(r){for(var l=1;l<=i;l++)o.push(we(l));n=i+1,o.push({type:"dots"})}else for(l=n;l<t-s/2;l++)o.push(we(l));for(l=0;l<s/2;l++){(c=t-s/2+l)<n||o.push(we(c))}o.push(we(t,!0));for(l=0;l<s/2;l++){var c;if((c=t+l+1)>e)break;c<n||(o.push(we(c)),n++)}if(a){o.push({type:"dots"});for(l=e-i+1;l<=e;l++)o.push(we(l))}else for(l=t+s/2+1;l<=e;l++)o.push(we(l));return t<e&&o.push({type:"next"}),o},prevUrl(){return this.getPageUrl(this.page-1)},nextUrl(){return this.getPageUrl(this.page+1)}},methods:{getPageUrl:e=>c.getPageUrl(e),onPrev(e){c.page=this.page-1,K(),a.stopEvent(e)},onNext(e){c.page=this.page+1,K(),a.stopEvent(e)},onPage(e,t){return e!==this.page&&(c.page=e,K()),a.stopEvent(t)}}};usf.components.SearchResultsPages=usf.register(_e,null,"usf-sr-pages");var Ie=e.search.priceUnit||"",Se,xe=e.search.imageSize,Pe;if(xe){var Fe=xe.split(",");xe=Fe[usf.isMobile&&Fe.length>1?1:0],e.search.imageSize=xe}switch(e.search.imageSizeType){case"dynamic":Se="{size}";break;case"fixed":Se=xe}function Ce(t){var s,r,o,l=t.product,c=l.variants,u=l.selectedVariantId,h=u?c.find(e=>e.id===u):null,d=h||(c.length?c[0]:null),f=d.compareAtPrice,m=d.price,p=f>m?f-m:0,g=n.collection,v=n.getProductUrl(g,l,h);if(h)s=h.available,r=1&h.flags,o=s>0||-2147483648===s;else{s=0;for(var b=0;b<c.length;b++){var y=c[b];if(-2147483648===y.available){s=-2147483648,r=!1,o=!0;break}s+=y.available,y.available>0&&(o=!0),1&y.flags&&(r=!0)}}var w=!!p;t.collection=g,t.productUrl=v,t.available=s,t.hasDiscount=w,t.continueSelling=r,t.isSoldOut=!r&&!o,t.price=m,t.compareAtPrice=f,t.originalPrice=f>m?f:m,t.displayPrice=a.getDisplayPrice(t.originalPrice)+Ie,t.displayDiscountedPrice=a.getDisplayPrice(t.price)+Ie,w&&(t.displayDiscount=a.getDisplayPrice(p)+Ie,t.discount=p),t.selectedVariant=h,t.selectedVariantForPrice=d,t.loc=i,t.scaledSelectedImageUrl=t.getSelectedImageUrl(Se),t.selectedImage=a.getProductImage(t.product,t.selectedVariant),t.hoverImage=e.search.showAltImage&&!u?Ve(l):null}function Ue(e){}function Le(e){e.c||(Pe=1)}var Me={props:{product:Object,term:String,result:Object,imageSize:{type:String,default:"list"}},created(){Ce(this)},data:()=>({isHover:!1,c:1}),computed:{salePercent(){if(Le(this),!this.hasDiscount)return 0;var e=this.selectedVariantForPrice;return Math.ceil(100-100*e.price/e.compareAtPrice)},minPrice(){var e=this.originalPrice;return this.product.variants.forEach(t=>{var s=t.compareAtPrice,i=t.price,r=s>i?s:i;r<e&&(e=r)}),e},maxPrice(){var e=this.originalPrice;return this.product.variants.forEach(t=>{var s=t.compareAtPrice,i=t.price,r=s>i?s:i;r>e&&(e=r)}),e},minDiscountedPrice(){var e=this.price;return this.product.variants.forEach(t=>{var s=t.price;s<e&&(e=s)}),e},maxDiscountedPrice(){var e=this.price;return this.product.variants.forEach(t=>{var s=t.price;s>e&&(e=s)}),e},priceVaries(){return this.minDiscountedPrice!==this.maxDiscountedPrice},displayMinPrice(){return a.getDisplayPrice(this.minPrice)+Ie},displayMaxPrice(){return a.getDisplayPrice(this.maxPrice)+Ie},displayMinDiscountedPrice(){return a.getDisplayPrice(this.minDiscountedPrice)+Ie},displayMaxDiscountedPrice(){return a.getDisplayPrice(this.maxDiscountedPrice)+Ie},displayLongPrice(){return Le(this),a.getLongDisplayPrice(this.originalPrice)+Ie},displayLongDiscount(){return Le(this),a.getLongDisplayPrice(this.discount)+Ie},displayLongDiscountedPrice(){return Le(this),a.getLongDisplayPrice(this.price)+Ie},image(){var e;return Ue("image"),Le(this),this.isHover&&(e=this.hoverImage),e||this.selectedImage},scaledHoverImageUrl(){return this.getHoverImageUrl(Se)},imageUrl(){return Ue("imageUrl"),Le(this),this.getImageUrl(this.imageSize)},selectedImageUrl(){return Ue("selectedImageUrl"),Le(this),this.getSelectedImageUrl(this.imageSize)},hoverImageUrl(){return Ue("hoverImageUrl"),Le(this),this.getHoverImageUrl(this.imageSize)},originalImageUrl(){return Ue("originalImageUrl"),Le(this),this.getImageUrl()},originalSelectedImageUrl(){return Ue("originalSelectedImageUrl"),Le(this),this.getSelectedImageUrl()},originalHoverImageUrl(){return Ue("originalHoverImageUrl"),Le(this),this.getHoverImageUrl()},scaledImageUrl(){return Ue("scaledImageUrl"),Le(this),this.getImageUrl(Se)},pluginData(){return{product:this.product,isHover:this.isHover,result:this.result,owner:this}}},methods:{reset(){this.isHover=!1},onItemClick(){var e=this.product;_usfaq.track("productClick",{url:this.productUrl,id:e.id,title:e.title,variantId:e.selectedVariantId,imageUrl:this.imageUrl,term:this.term});for(var t=usf_container.querySelectorAll(ne),s=usf.search.itemsOffset,i=0,r=0;r<t.length;r++){var a=t[r];if(a.getAttribute("data-usf-pid")==e.id){s+=r,i=a.getBoundingClientRect().y;break}}ye(s,e.id,i)},onItemHover(){this.isHover=!0},onItemLeave(){this.isHover=!1},getImageUrl(e){var t,s=this.product;return this.isHover&&(t=this.getHoverImageUrl(e)),t||a.getProductImageUrl(s,this.selectedVariant,e)},getSelectedImageUrl(e){return a.getProductImageUrl(this.product,this.selectedVariant,e)},getHoverImageUrl(t){if(e.search.showAltImage){var s=this.product;if(!s.selectedVariantId)return ze(s,t)}},getMetafield(e,t){return a.getMetafield(this.product,e,t)},setSelectedVariantId(e){var t=this.product,s=t.variants.find(t=>t.id===e);if(s)return t.selectedVariantId=e,Ce(this),this.c++,this.$forceUpdate(),s}}};usf.components.SearchResultsItemBase=Me;var Te={mixins:[Me],template:s.searchResultsGridViewItem};usf.components.SearchResultsGridItem=usf.register(Te,null,"usf-sr-griditem");var ke={mixins:[Me],template:s.searchResultsListViewItem};usf.components.SearchResultsListItem=usf.register(ke,null,"usf-sr-listitem"),t.add("is_show",Oe);var Ne,De={},Re,$e;function Oe(r){if(!$e){Re=e.search.online?n.baseUrl+e.search.searchResultsUrl:n.searchUrl;var o=document.createElement("div");document.body.appendChild(o);var l={mixins:[ie],el:o,template:s.instantSearch,data:()=>({left:0,top:0,width:0,show:!1,firstLoader:!0,loader:!0,term:r.value,result:null}),computed:{isEmpty(){var e=this.result;return!(e&&(e.items.length||e.pages&&e.pages.length||e.collections&&e.collections.length))},queryOrTerm(){var e=this.result;return e?e.query:this.term},termDiffers(){return!this.loader&&this.result.query.trim()!==this.term.trim().toLowerCase()}},methods:{focus(){var e=this.$el.querySelector("input");e&&e.focus()},close(){this.show=0,this.popupFocus=!1,document.documentElement.classList.remove("usf-no-scroll")},onSearchBoxInput(e){this.updateTerm(e.target.value)},onClear(){this.updateTerm(""),this.$refs.searchInput.focus()},updateResults(s){var i=this;Ne&&Ne.abort(),i.loader=!s||"more";var r=usf._refineTerm(i.term);s||(i.itemsLoaded=0);var o={q:r,apiKey:e.siteId,showFacets:!0};r?i.sortBy&&"r"!==i.sortBy&&(o.sort=i.sortBy):o.sort="bestselling",s&&(o.skip=i.itemsLoaded),o.take=e.instantSearch.numOfProductMatches;var l=n.customerTags;l&&l.length&&(o.customerTags=l.join(","));var c=n.locale;c&&(o.locale=c),e.instantSearch.showCollections&&(o.showCollections=1),e.instantSearch.showPages&&(o.showPages=1),this.onSendingData(o),t.raise("is_updating",this,o);var u=JSON.stringify(o);function h(e){De[u]=e,Ne=null,i.loader=!1,i.firstLoader=!1,e=JSON.parse(e),t.raise("is_dataReceived",this,e.data),i.onDataReceived(o,e.data),i.$nextTick(()=>{t.raise("is_updated",this,i.result),i.__init()})}var d=De[u];d?h(d):Ne=a.send({url:e.searchSvcUrl+"instantsearch",data:o,success:h,error:function(e){Ne=null,i.loader=!1}})}},beforeMount(){usf.instantSearch=this,this.searchUrl=Re,this.settings=e.instantSearch,this.loc=i,t.add("is_hide",this.close)}};usf.components.InstantSearchBase=l;var u={mixins:[l],data:{popupFocus:!1,position:"right"},computed:{shouldShow(){return this.show||this.popupFocus}},beforeMount(){t.add("resize",this.onResize),document.body.addEventListener("mousedown",e=>{if(this.shouldShow){for(var s=e.target;s&&s!==this.$el&&s!==this.input;){if(s===document.body){var i={cancel:!1};return t.raise("is_hiding",this,i),i.cancel?(this.popupFocus=!0,void a.stopEvent(e)):void usf.utils.hideInstantSearch()}s=s.parentNode}this.popupFocus=!0}}),document.body.addEventListener("mouseup",e=>{this.shouldShow&&setTimeout(()=>{this.input.value||(this.popupFocus=!1)},100)})},methods:{__init(){},onResize(e){this.show&&this.reposition(this.input)},onSendingData(e){},onDataReceived(e,t){De[e.q]=this.result=t},onItemClick(e){},selectCollection(e){location=n.getCollectionUrl(e.urlName)},selectPage(e){location=n.getPageUrl(e)},updateTerm(e){this.term=e,this.updateResults()},search(t){this.show=0,this.popupFocus=!1;var s=Re;location.pathname===s&&e.search.online||window.usf_container&&this.input.closest(".usf-sr-inputbox")?(this.input.value=t,c.term=t):location=s+"?"+c.getTermQuery(t),window.usf_container&&usf_container.click(),a.hideInstantSearch()},reposition(e){var t=this;if(this.input=e,usf.isMobile)with(document.documentElement.classList.add("usf-no-scroll"),this)show=1,term=e.value,setTimeout(t.focus,170),updateResults();else{var s=e.getBoundingClientRect(),i={x:s.x+window.scrollX,y:s.y+window.scrollY};o(i),this._posTimeout&&clearInterval(this._posTimeout);var r=0,a=()=>{if(this.shouldShow){var t=k(e);if(i.y!==t.y||i.x!==t.x){if(!e.offsetWidth&&!e.offsetHeight||t.y<0)return clearInterval(this._posTimeout),void usf.utils.hideInstantSearch();o(t)}++r>=25&&clearInterval(this._posTimeout)}else clearInterval(this._posTimeout)};this._posTimeout=setInterval(a,200)}function o(s){var i=s.x,r=s.y+e.offsetHeight,a=e.offsetWidth,o=a,n=window.innerWidth,l;with(o<858&&(o=858),i+o>n-20?(i=i+a-o,i<0?(l="middle",i=(n-o)/2):l="right"):l="left",t)left=i,top=r,width=o,show=1,term=e.value,position=l}}}};usf.components.InstantSearch=u;var h={mixins:[usf.components.SearchResultsItemBase],template:s.instantSearchItem,imageSize:"small",methods:{onItemClick(){var e=this.product;$e.onItemClick(e),_usfaq.track("productClick",{url:this.productUrl,id:e.id,title:e.title,variantId:e.selectedVariantId,imageUrl:this.imageUrl,term:this.term}),location=this.productUrl}}};usf.components.InstantSearchItem=usf.register(h,null,"usf-is-item"),t.raise("is_init",this),$e=new RVue(usf.components.InstantSearch)}$e.reposition(r),$e.updateResults(),setTimeout(()=>$e.show=1,0)}t.add("init",function(){var i=window.usf_container;if(i&&usf._canLoadContainer){o=n.collection;var r=usf.app=new RVue({el:i,template:s.app,data:{collection:null,settings:e,hasFilters:!usf.isMobile},mounted(){usf.settings=e=this.settings,t.raise("mounted")}});t.add("sr_updated",function(){var e=n.collection;if(e){var t=usf.collectionsByUrlName[e];r.$set(usf.app,"collection",t||{title:"All products"})}}),t.add(["mobile_changed","rerender"],function(){Xe(r);var e=usf.instantSearch;e&&Xe(e)}),t.add("resetstate",function(){!function e(t){t.$children.forEach(t=>e(t)),t.reset&&t.reset()}(r)})}});var Be={functional:!0,props:{name:String,data:Object},render(e,t){var s=usf.plugins.invoke("render_"+t.props.name,[t.parent,e,t.props.data]);return usf.plugins.lastRenderResult=s,s}};function Ee(e,t,s){for(var i=0,r=0,a=function(){++r===i&&t()},o=document.head.children,n=0,l=0;l<o.length;l++){var c=o[l],u=c.src;u&&u.includes(e)&&(i++,c.addEventListener("load",a),n++)}!n&&s&&s(n)}function He(e,t){return e&&t?e.replace(new RegExp(t,"gi"),e=>'<span class="usf-highlight">'+e+"</span>"):e}usf.components.Plugin=usf.register(Be,null,"usf-plugin"),Object.assign(a,{registerScriptsLoadedCallback(e,t,s,i,r,a){var o;e?s():(i&&(o=setTimeout(r,i)),Ee(t,function(){setTimeout(s,30),i&&clearTimeout(o)},a))},getMetafield(e,t,s){var i=e.metafields&&e.metafields.find(e=>e.namespace===t&&e.key===s);return i&&i.value?i.value:""},getProductImage(e,t){var s,i=0,r=e.images;r&&(t&&(s=t.imageIndex)>0&&s<r.length&&(i=s));return r&&r[i]||n.emptyImage},getProductImageUrl(e,t,s){var i,r=0,a=e.images;a&&(t&&(i=t.imageIndex)>0&&i<a.length&&(r=i));return a=a&&a[r],n.getImageUrl((a?a.url:null)||n.emptyImage.url,s)},convertPrice:t=>e.currencyRate?t*e.currencyRate:t,isVariantSoldOut(e){var t=e._s;if(void 0!==t)return t;-2147483648===e.available?t=!1:t=!(1&e.flags)&&e.available<=0;return e._s=t,t},getDisplayPrice:t=>qe(e.priceFormat,We(a.convertPrice(t))),getLongDisplayPrice:t=>qe(e.priceLongFormat,We(a.convertPrice(t))),formatNumber:We,format:function(e){for(var t=1;t<arguments.length;t++)e=e.replace("{"+(t-1)+"}",arguments[t]);return e},encodeHtml:e=>e.replace(/</g,"&lt;"),highlight:He,ensureMobile(s){var i=document.body.clientWidth;if(i!==je||!0===s){je=i;var r=i<e.mobileBreakpoint;r!==usf.isMobile&&(usf.isMobile=r,usf.isMobileFilter=r&&!e.filters.desktopLikeMobile,document.body.classList[usf.isMobile?"add":"remove"]("usf-mobile"),r||(usf.app.hasFilters=!0),t.raise("mobile_changed")),t.raise("resize",null,{width:i})}},scrollTo(e,t){if(T)return window.scrollTo(0,e);const s=document.scrollingElement,i=s&&s.scrollTop||window.pageYOffset,r=e-i;let a=0;const o=function(){const e=(s=a+=20,n=i,l=r,(s/=t/2)<1?l/2*s*s*s+n:l/2*((s-=2)*s*s+2)+n);var s,n,l;window.scrollTo(0,e),a<t&&requestAnimationFrame(o)};o()}});var qe=a.format;function Ve(e){var t=e.images;return t=t&&t.length>1&&t[1]}function ze(e,t){var s=e.images;return s&&s.length>1&&n.getImageUrl(s[1].url,t)}var Ae=1.7976931348623157e308,je;function We(t,s){var i;void 0===s&&(s=e.decimals);var r=Math.pow(10,s);i=Math.round(t*r).toString();var a=e.decimalDisplay,o=e.useTrailingZeros;if(s){var n=i.length;if(n>s){var l,c=n-s,u=i.substr(c);if(o)if(u.length<s)for(;u.length<s;)u+="0";else{for(var h=u.length-1;h>s&&"0"==u[h];)h--;h++,u=u.substr(0,h)}else{l=!0;for(var d=u.length-1;d>=0;){if("0"!==u[d]){l=!1;break}d--}d++,!l&&d<u.length&&(u=u.substr(0,d))}i=l?i.substr(0,c):i.substr(0,c)+a+u}else if(o){for(;i.length<s;)i="0"+i;i="0"+a+i}else if("0"!==i){for(;i.length<s;)i="0"+i;i="0"+a+i}}var f=e.thousandSeparator;return f?i.replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1"+f):i}function Xe(e){e.$children.forEach(e=>Xe(e)),e.$forceUpdate()}function Ke(e,t,s){var i;return function(){var r=this,a=arguments;clearTimeout(i),i=setTimeout(function(){i=null,s||e.apply(r,a)},t),s&&!i&&e.apply(r,a)}}function Ge(e){return":"===e[0]?e.substring(1):e}a.ready(function(){je=document.body.clientWidth,window.addEventListener("resize",a.ensureMobile)}),usf._ios=T;var Ye=T?"pagehide":"beforeunload"}();

/* Begin plugin code */
!function(){var e=usf.utils,t=e.isVariantSoldOut,s={};function i(i){var a={props:{option:Object,index:Number},render(e){var t=this.$parent,s=t.args.result.facets,i=this.option,a=i.name,n=this.index,r=((usf.settings.plugins["preview-usf"]||{}).displayType||{})[a];if(void 0===r){var l=s.find(e=>e.facetName==="option:"+a);l||(l={display:"List"}),"List"===l.display&&(r="select")}return"select"===r?e("div",{class:"usf-preview__option usf-preview__field"},[e("label",a),e("select",{domProps:{value:t.selectedOptions[n]},on:{input:e=>t.selectOptionValue(n,parseInt(e.target.value))}},i.values.map((s,i)=>e("option",{domProps:{value:i,disabled:!t.availableOptions[n]||!t.availableOptions[n][i]}},[s])))]):e("div",{class:"usf-preview__option usf-preview__field usf-facets"},[e("label",a),e("div",{staticClass:"usf-facet-values usf-facet-values--"+l.display,class:{"usf-facet-values--circle":l.circleSwatch}},i.values.map((s,i)=>{var a=l.swatchImages?l.swatchImages[s]:null,r=!t.availableOptions[n]||!t.availableOptions[n][i];return e("button",{staticClass:"usf-btn usf-relative usf-facet-value usf-facet-value-single",class:{"usf-selected":t.selectedOptions[n]===i,"usf-disabled":r},on:r?null:{click:()=>t.selectOptionValue(n,i)},style:a?{background:a.imageUrl?"url("+a.imageUrl+")":a.color}:null,domProps:{title:s+(r?" (option not available)":""),type:"button"}},[e("span",{class:"usf-label"},[s])])}))])}};usf.components.PreviewModalOption=usf.register(a,null,"usf-preview-modal-option");var n={props:{value:Number,name:String,min:Number,max:Number,disabled:Boolean},methods:{onInput(e){var t;this.disabled||(e.target?t=e.target.value:((t=parseInt(this.value)+e)<this.min&&(t=this.min),t>this.max&&(t=this.max)),this.$emit("input",t))}},render(e){var t={name:this.name,type:"number",step:"1",min:this.min,max:this.max,pattern:"[0-9]*",inputmode:"numeric"};return this.disabled&&(t.disabled=!0),e("div",{class:"usf-c-num-input"},[e("input",{attrs:t,domProps:{value:this.value},on:{change:this.onInput}}),e("div",{class:"usf-c-num-input__m",on:{click:()=>this.onInput(-1)}}),e("div",{class:"usf-c-num-input__p",on:{click:()=>this.onInput(1)}})])}};usf.components.NumInput=usf.register(n,null,"usf-num-input");var r=i.product,l=document.createElement("div");document.body.appendChild(l);var o=r.selectedVariantId;o=o?r.variants.find(e=>e.id===o):r.variants[0];var u,d=r.images;d.length?u=e.getProductImageUrl(r,o):(d=[usf.platform.emptyImage],u=d[0].url);var c=d.findIndex(e=>e.url===u);new RVue({el:l,template:usf.templates.previewPluginModal,data:{args:i,description:s[r.id],imageUrl:u,imageIndex:c,image:-1!==c?d[c]:null,imageMaxHeight:600,imageMaxWidth:340,images:d,quantity:1,selectedOptions:{},selectedVariant:o,loc:usf.settings.translation,product:r,mainImagePosition:"left",showImageIndices:!0,showThumbs:d.length>1,thumbDirection:"horizontal",slidesToShow:4},created(){this.settings=usf.settings.plugins["preview-usf"]||{}},beforeMount(){if(this._keyboardDlg=(e=>{27===e.keyCode&&this.onClose()}),e.on(document,"keydown",this._keyboardDlg),o&&this.selectVariant(o),!this.description){var t=this.product.id;usf.utils.send({url:usf.settings.searchSvcUrl+"products",data:{apiKey:usf.settings.siteId,id:t,fields:"description"},success:e=>{e=JSON.parse(e),s[t]=this.description=e.data.description}})}},mounted(){setTimeout(()=>{this.$el.classList.add("usf-loaded")},300)},computed:{selectedVariantForPrice(){return this.selectedVariant},available(){if(this.isSoldOut)return 0;var e=this.selectedVariant,t=e.available;return 1&e.flags||-2147483648===t?1e6:t},showBigImageNav(){return this.images.length>1},showThumbNav(){return this.images.length>1},productUrl(){return usf.platform.getProductUrl(usf.platform.collection,r,this.hasAvailableVariant?this.selectedVariant:null)},hasDiscount(){var e=this.selectedVariant;return e.compareAtPrice>e.price},isSoldOut(){var e=this.selectedVariant;return t(e)},availableOptions(){var e={};return r.variants.forEach(s=>{t(s)||s.options.forEach((t,s)=>{e[s]||(e[s]={}),e[s][t]=1})}),e},hasAvailableVariant(){for(var e=this.selectedOptions,s=Object.keys(e).length,i=0,a=0;a<r.variants.length;a++){var n=r.variants[a];if(!t(n)){i=0;for(var l=0;l<n.options.length;l++){var o=n.options[l];e[l]===o&&i++}if(i===s)return!0}}return!1}},methods:{onClose(){this.$el.classList.add("usf-removed"),setTimeout(()=>{document.body.removeChild(this.$el),e.off(document,"keydown",this._keyboardDlg),this.$destroy()},300)},onThumbClick(e){var t=this.selectImage(e),s=r.variants.find(e=>e.imageIndex===t);s&&this.selectVariant(s)},onPrevImage(e){this.navigate(-1,e)},selectImage(e){var t;return"number"==typeof e?(t=e,e=r.images[e]):t=r.images.indexOf(e),this.imageUrl=e.url,this.image=e,this.imageIndex=t,t},onNextImage(e){this.navigate(1,e)},navigate(e,t){var s=this.imageIndex+e;s<0?s=this.images.length-1:s>=this.images.length&&(s=0),this.onThumbClick(this.images[s])},selectVariant(e){this.selectedVariant=e,r.options.forEach((t,s)=>{this.$set(this.selectedOptions,s,e.options[s])})},selectOptionValue(e,t){this.$set(this.selectedOptions,e,t),r.options;for(var s=r.variants,i=0;i<s.length;i++){for(var a=s[i],n=a.options,l=!0,o=0;o<n.length;o++)if(n[o]!==this.selectedOptions[o]){l=!1;break}if(l){this.selectedVariant=a,a.imageIndex>=0&&a.imageIndex<r.images.length&&this.selectImage(a.imageIndex);break}}}}})}usf.event.add("preview_show",(e,t)=>i(t));var a={props:{loc:Object,args:Object},template:usf.templates.previewPlugin,created(){this.settings=usf.settings.plugins["preview-usf"]||{}},methods:{onShowModal(t){return i(this.args),e.stopEvent(t)}}};usf.plugins.push({render_searchResultsProductPreview:(e,t,s,i)=>[i(),t(a,{props:{loc:usf.settings.translation,args:s}})]})}();

/* End plugin code */