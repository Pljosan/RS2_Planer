#pragma checksum "/home/ana/Desktop/RS2/RS2_Planer/Planer/Views/User/ListUsers.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "1797ee76a6de0c9d83e06b9af2a45ea6db6ac29e"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_User_ListUsers), @"mvc.1.0.view", @"/Views/User/ListUsers.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/User/ListUsers.cshtml", typeof(AspNetCore.Views_User_ListUsers))]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#line 1 "/home/ana/Desktop/RS2/RS2_Planer/Planer/Views/_ViewImports.cshtml"
using Planer.Models;

#line default
#line hidden
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"1797ee76a6de0c9d83e06b9af2a45ea6db6ac29e", @"/Views/User/ListUsers.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"33b86750e0df6fc7eabc582e5cadd4fa138150e9", @"/Views/_ViewImports.cshtml")]
    public class Views_User_ListUsers : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<IEnumerable<User>>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            BeginContext(25, 2, true);
            WriteLiteral("\n\n");
            EndContext();
#line 4 "/home/ana/Desktop/RS2/RS2_Planer/Planer/Views/User/ListUsers.cshtml"
 foreach (User u in Model) {

#line default
#line hidden
            BeginContext(56, 22, true);
            WriteLiteral("    <div>\n        <h3>");
            EndContext();
            BeginContext(79, 11, false);
#line 6 "/home/ana/Desktop/RS2/RS2_Planer/Planer/Views/User/ListUsers.cshtml"
       Write(u.FirstName);

#line default
#line hidden
            EndContext();
            BeginContext(90, 17, true);
            WriteLiteral("</h3>\n    </div>\n");
            EndContext();
#line 8 "/home/ana/Desktop/RS2/RS2_Planer/Planer/Views/User/ListUsers.cshtml"
}

#line default
#line hidden
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<IEnumerable<User>> Html { get; private set; }
    }
}
#pragma warning restore 1591
