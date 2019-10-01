
<template>
    <!-- Editor Content -->
    <div>
        <template v-if="dateList.length">
             <div class="card--block card--feed">
                <div class="card-header">
                    <p class="card-header-title">
                        <span class="icon">
                            <i class="fas fa-chart-line"></i>
                        </span>
                        {{$t('dashboardPage.postsChart')}}
                    </p>
                </div>
                <div class="card--content p-0 chartPosts">
                    <e-charts :options="chartOptions" theme="chart-theme" ref="line" auto-resize />
                </div>
            </div>
        </template>
        <template v-else>
            <loading-data></loading-data>
        </template>
    </div>

</template>

<script>
import ECharts from "vue-echarts/components/ECharts";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/chart/line";
import theme from "./theme.json";

ECharts.registerTheme("chart-theme", theme);

import moment from 'moment-timezone'


// Repository Data
import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const chartsRepository = RepositoryFactory.get("charts");

export default {
    data() {
        var dateList = [];
        var valueList = [];

        return {
            chartOptions: {
                title: {
                    text: "Posts Chart"
                },
                // Make gradient line here
                visualMap: [
                    {
                        show: true,
                        type: "continuous",
                        seriesIndex: 0,
                        min: 0,
                        max: 400
                    }
                ],


                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },

                xAxis: {
                    data: dateList
                },
                yAxis: {
                    splitLine: { show: false }
                },
                series: {
                    type: "line",
                    showSymbol: false,
                    data: valueList
                }
            },
            chartData: null,
            dateList: dateList,
            valueList: []
        };
    },
    created() {
        this.getChart();
    },
    mounted() {},
    methods: {
        async getChart() {
            const chartData = await chartsRepository.getChartData(
                "post",
                "months",
                "7"
            );
            this.dateList = []
            this.valueList = []
            // this.chartData = chartData.data.total;
            this.dateList = chartData.map(function(item) {
                return  moment(item.date).format('YYYY/MM/DD');
            });
            this.valueList = chartData.map(function(item) {
                return item.total;
            });
            this.chartOptions.xAxis.data = this.dateList;
            this.chartOptions.series.data = this.valueList;
        }
    },
    components: {
        ECharts
    }
};
</script>


<style lang="scss">
.echarts {
    width: 100% !important;
    max-height: 300px;
    overflow: hidden;
}
</style>
