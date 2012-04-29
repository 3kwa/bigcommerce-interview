var BCVis = ( function() {

    var module = {};

    var ORDER_RADIUS = 10;
    var AURA_RADIUS = 100;
    var AURA_OPACITY = 0.9;
    var STATUS_HEIGHT = 10;
    var STATUS_WIDTH = 50;
    var STATUS_ROUND = 5;
    var ANGLE = 20;

    module.ORDERS = [];

    module.STATUS = [];

    function get_order_id(order_id) {
        for (var index=0; index < module.ORDERS.length; index++) {
            if (order_id == module.ORDERS[index].id) {
                return module.ORDERS[index]; }; }; }

    function get_color_for_status(status_id) {
        for (var index=0; index < module.STATUS.length; index++) {
            if (status_id == module.STATUS[index].id) {
                return module.STATUS[index].color; }; }; };

    function get_rotation_for_status(status_id) {
        for (var index=0; index < module.STATUS.length; index++) {
            if (status_id == module.STATUS[index].id) {
                return index * ANGLE; }; }; };

    function set_order_status(order_id, status_id) {
        for (var index=0; index < module.ORDERS.length; index++) {
            if (order_id == module.ORDERS[index].id) {
                module.ORDERS[index].status = status_id; }; }; };

    function create_order(cx, cy, order) {
        d3.select('svg').append('circle')
        .attr('id', 'order_' + order.id)
        .attr('cx', cx)
        .attr('cy', cy)
        .attr('r', ORDER_RADIUS)
        .attr('fill', get_color_for_status(order.status))
        .attr('class', 'order')
        .on('click', function() {
            var cx = this.cx.baseVal.value;
            var cy = this.cy.baseVal.value;
            create_aura(cx, cy, order.id); }); };

    function remove_aura() {
        d3.select('circle.aura').transition()
        .attr('r', 0).remove();
        d3.selectAll('g.aura rect').transition()
        .attr('width', 0).remove();
        d3.selectAll('g.aura').transition().delay().remove();
    };

    function create_aura(cx, cy, order_id) {
        // to avoid duplication of aura
        remove_aura();
        d3.select('svg').append('g').attr('class', 'aura').append('circle')
        .attr('cx', cx)
        .attr('cy', cy)
        .attr('r', 0)
        .attr('opacity', AURA_OPACITY)
        .attr('fill', '#eeeeee')
        .attr('stroke', '#dddddd')
        .attr('stroke-width', '1px')
        .attr('class', 'aura')
        .on('click', function() {
            remove_aura(); })
        .transition()
        .attr('r', AURA_RADIUS);
        var g = d3.select('g.aura');
        create_fan(g, cx, cy, order_id); };

    function create_fan(g, cx, cy, order_id) {
        var order = get_order_id(order_id);
        var rotation = get_rotation_for_status(order.status);
        var transform = 'translate(' + cx +',' +  cy +') rotate(-' + rotation + ')';
        var fan_position = {cx: cx, cy: cy, rotation: rotation};
        var fan = g.append('g')
        .attr('id', 'fan')
        .attr('transform', transform);
        for (var index=0; index < module.STATUS.length; index++) {
            create_status(fan, index * ANGLE, module.STATUS[index].id, fan_position, order_id);}; };

    function create_status(g, angle, status_id, fan_position, order_id) {
        var transform = 'rotate(' + angle + ')';
        g.append('g').attr('transform', transform).append('rect')
        .attr('class', 'aura')
        .attr('x', AURA_RADIUS - ORDER_RADIUS - STATUS_WIDTH)
        .attr('y', - STATUS_HEIGHT / 2)
        .attr('rx', STATUS_ROUND)
        .attr('ry', STATUS_ROUND)
        .attr('width', 0)
        .attr('height', STATUS_HEIGHT)
        .attr('fill', get_color_for_status(status_id))
        .on('click', function() {
            var x = fan_position.cx;
            var y = fan_position.cy;
            var rotation = get_rotation_for_status(status_id);
            var transform = 'translate(' + x +',' +  y +') rotate(-' + rotation + ')';
            d3.select('#fan').transition().attr('transform', transform);
            set_order_status(order_id, status_id);
            d3.select('#order_' + order_id)
            .attr('fill', get_color_for_status(status_id));
            // last but not least updating the status with BC
            $.post('/order/' + order_id, {status: status_id}); ;})
        .transition().delay()
        .attr('width', STATUS_WIDTH); };

    module.display_orders = function() {
        for (var index=0; index < module.ORDERS.length; index++) {
            var cx = 150 + index * 40;
            var cy = 150;
            var order = module.ORDERS[index];
            create_order(cx, cy, order);
            }; };

    return module;

}());
