(function () {
  angular.module('svgAbstraction.services').factory('shapePaths', function () {
    return {
      'square': 'M0,0L100,0L100,100L0,100z',
      'heart': 'M190.95184190571857,18.67034584574202c-22.323836384105082,-25.959966259055825 -59.94907374597721,-24.70023237340574 -83.60038330843584,2.7667085108788574L103.48050782485348,25.934428571291733l-3.870951376425747,-4.497373337497029c-23.651309562458632,-27.466939656241248 -61.27654692433076,-28.726676348847562 -83.60038330843584,-2.7667085108788574c-22.333969029440297,25.936421510213755 -21.2598313123552,69.65041398214339 2.381344245776086,97.11735083142841l85.07985583076164,98.8480189913071l85.07985583076164,-98.8480189913071C212.20154057273854,88.32075982788542 213.28581576713086,44.60676174204332 190.95184190571857,18.67034584574202z',
      'chatBubbles': 'M15.985,5.972c-7.563,0-13.695,4.077-13.695,9.106c0,2.877,2.013,5.44,5.147,7.108c-0.446,1.479-1.336,3.117-3.056,4.566c0,0,4.015-0.266,6.851-3.143c0.163,0.04,0.332,0.07,0.497,0.107c-0.155-0.462-0.246-0.943-0.246-1.443c0-3.393,3.776-6.05,8.599-6.05c3.464,0,6.379,1.376,7.751,3.406c1.168-1.34,1.847-2.892,1.847-4.552C29.68,10.049,23.548,5.972,15.985,5.972zM27.68,22.274c0-2.79-3.401-5.053-7.599-5.053c-4.196,0-7.599,2.263-7.599,5.053c0,2.791,3.403,5.053,7.599,5.053c0.929,0,1.814-0.116,2.637-0.319c1.573,1.597,3.801,1.744,3.801,1.744c-0.954-0.804-1.447-1.713-1.695-2.534C26.562,25.293,27.68,23.871,27.68,22.274z',
      'arrow': 'M15.834,29.084 15.834,16.166 2.917,16.166 29.083,2.917z'
    };
  });
})();