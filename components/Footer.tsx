import React from 'react';

const FooterLink: React.FC<{href: string, children: React.ReactNode}> = ({href, children}) => (
    <a href={href} className="text-gray-400 hover:text-white transition-colors text-sm">{children}</a>
);

export const Footer: React.FC = () => {
    return (
        <footer className="bg-[#110C22] border-t border-purple-900/50 text-white mt-16">
            <div className="max-w-7xl mx-auto px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    <div className="space-y-4">
                        <FooterLink href="#">About</FooterLink>
                        <FooterLink href="#">Jobs</FooterLink>
                        <FooterLink href="#">Press</FooterLink>
                    </div>
                     <div className="space-y-4">
                        <FooterLink href="#">Help Center</FooterLink>
                        <FooterLink href="#">Terms of Use</FooterLink>
                        <FooterLink href="#">Privacy</FooterLink>
                    </div>
                     <div className="space-y-4">
                        <FooterLink href="#">Community</FooterLink>
                        <FooterLink href="#">Blog</FooterLink>
                        <FooterLink href="#">Changelog</FooterLink>
                    </div>
                     <div className="space-y-4">
                        <FooterLink href="#">GitHub</FooterLink>
                        <FooterLink href="#">Twitter / X</FooterLink>
                        <FooterLink href="#">Discord</FooterLink>
                    </div>
                </div>
                <div className="text-center text-xs text-gray-500 pt-8 border-t border-purple-900/50">
                    <p>&copy; {new Date().getFullYear()} fillshy. All rights reserved.</p>
                    <p className="mt-1">Made by akadion, 2025</p>
                </div>
            </div>
        </footer>
    );
};
