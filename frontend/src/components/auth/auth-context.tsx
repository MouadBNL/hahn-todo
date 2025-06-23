import { createContext, useContext } from 'react';
import { authService } from '@/services';
import { useQuery } from '@tanstack/react-query';
import type { AuthUser } from '@/domaine/entities';
import { AuthUtils } from '@/lib/auth';

interface AuthContextType {
	user: AuthUser | null;
	isPending: boolean;
	isFetching: boolean;
	error: Error | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {

	const { data: user, isPending, isFetching, error } = useQuery({
		queryKey: ['auth'],	
		queryFn: async () => {
			console.log('queryFn [auth]');
			try {	
				return await authService.me();
			} catch (error: unknown) {
				AuthUtils.removeToken();
				throw error;
			}
		},
		initialData: null,
		retry: false,
		throwOnError(error) {
			if (error instanceof Error && error.message === 'Unauthorized') {
				return true;
			}
			return false;
		},
	})


	return (
		<AuthContext.Provider value= {{ user, isPending, isFetching, error }}>
			{ children }
		</AuthContext.Provider>
	)
}

export function useAuth() {	
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}
